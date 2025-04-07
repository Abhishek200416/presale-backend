const ngrok = require('ngrok');
(async function() {
    try {
        const url = await ngrok.connect({
            addr: 5000,
            authtoken: '2pJ88T6Xs3m4wtryI5TEW7TRC72_7pV8cBDBq9VXuB6b732Qx'
        });
        console.log(`ngrok tunnel available at: ${url}`);
    } catch (err) {
        console.error('ngrok failed to start:', err);
    }
})();