const dns = require('dns');
const https = require('https');

console.log('--- Starting Network Diagnostics ---');

const checkDNS = (domain) => {
    return new Promise((resolve) => {
        console.log(`Checking DNS functionality for ${domain}...`);
        const start = Date.now();
        dns.lookup(domain, (err, address, family) => {
            const duration = Date.now() - start;
            if (err) {
                console.error(`[FAIL] DNS Lookup for ${domain} failed: ${err.message} (${duration}ms)`);
                resolve(false);
            } else {
                console.log(`[PASS] DNS Lookup for ${domain} resolved to ${address} (${duration}ms)`);
                resolve(true);
            }
        });
    });
};

const checkHTTP = (url) => {
    return new Promise((resolve) => {
        console.log(`Checking HTTP connectivity to ${url}...`);
        const start = Date.now();
        const req = https.get(url, (res) => {
            const duration = Date.now() - start;
            console.log(`[PASS] HTTP Request to ${url} succeeded with status code: ${res.statusCode} (${duration}ms)`);
            res.resume(); // Consume response data to free up memory
            resolve(true);
        });

        req.on('error', (e) => {
            const duration = Date.now() - start;
            console.error(`[FAIL] HTTP Request to ${url} failed: ${e.message} (${duration}ms)`);
            resolve(false);
        });

        req.setTimeout(5000, () => {
            const duration = Date.now() - start;
            console.error(`[FAIL] HTTP Request to ${url} timed out after 5000ms`);
            req.abort();
            resolve(false);
        });
    });
};

const runDiagnostics = async () => {
    // 1. Check general internet connectivity
    const googleDNS = await checkDNS('google.com');

    // 2. Check Firebase Auth Domain
    const firebaseDNS = await checkDNS('firebase.googleapis.com');

    // 3. Check Identity Toolkit (used by Auth)
    const identityDNS = await checkDNS('identitytoolkit.googleapis.com');

    // 4. Check Project Hosting (if applicable, though often on different domain)
    const projectDNS = await checkDNS('glassmorphismauth.firebaseapp.com');

    console.log('\n--- Connectivity Checks ---');
    if (googleDNS && !firebaseDNS) {
        console.error('CRITICAL: You have internet access (Google is reachable), but Firebase is blocked or failing DNS resolution.');
        console.error('Possible causes: Firewall, ISP blocking, VPN, or corporate network restrictions.');
    } else if (!googleDNS) {
        console.error('CRITICAL: General internet connectivity seems to be down. DNS lookup for google.com failed.');
    } else if (firebaseDNS && identityDNS) {
        console.log('DNS resolution looks good. Checking HTTP...');
        await checkHTTP('https://firebase.googleapis.com');
        await checkHTTP('https://identitytoolkit.googleapis.com');
    }

    console.log('\n--- Diagnostics Complete ---');
};

runDiagnostics();
