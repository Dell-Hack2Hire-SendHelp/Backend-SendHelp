
const api_key = 'e59f24f06a7aca083986f3ee8501bbc0-b36d2969-9da69035';
const domain = 'sandboxc8285d9041f24ff69ca69d7ba007cf86.mailgun.org';

import mailgun from 'mailgun-js';

const mg = mailgun({ apiKey: api_key, domain: domain });


export function sendStatusEmail(to: string, status: string) {
    var data = {
        from: 'forestape@mailgun.org',
        to: to,
        subject: 'Your order has been ' + status,
        text: 'Dear customer, Your order has been ' + status
    };

    mg.messages().send(data, function (error, body) {
        console.log("Email is sent to " + to + " with status " + status);
    });
}
