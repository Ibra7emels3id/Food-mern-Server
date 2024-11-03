const nodemailer = require('nodemailer');

const sendEmail = async (email, paymentDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ibrahemelsaid692@gmail.com',
            pass: 'phsf wivd tand hvtj',
        },
    });

    const mailOptions = {
        from: 'ibrahemelsaid692@gmail.com',
        to: email,
        subject: 'Payment Confirmation',
        text: `Thank you for your payment of ${paymentDetails.amount}. Transaction ID: ${paymentDetails.id}`,
        html: `
        <section style="margin: 16px;">
            <h1 style="margin-top: 32px; text-align:center; font-size: 36px; font-weight: bold; color: White;">
                Food Mart
            </h1>
            <section style="margin-top: 32px; text-align: center;">
                <p style="margin: 16px; font-size: 18px; font-weight: bold; color: #4f46e5;">
                Payment Successfully Processing 
                </p>
                <h1 style="margin-top: 8px; font-size: 36px; font-weight: bold; color: #1f2937;">
                    Order Details
                </h1>
                <p style="font-size: 16px; color: #6b7280;">
                Amount: ${paymentDetails.amount}
                </p>
                <p style="font-size: 16px; color: #6b7280;">
                Transaction ID: ${paymentDetails.id}
                </p>
                <p style="font-size: 16px; color: #6b7280;">
                Order Date: ${new Date().toLocaleString()}
                </p>
                <a
                    href=${process.env.URL}
                    style="display: inline-block; margin-top: 16px; padding: 12px 40px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Read more
                </a>
            </section>
        </section>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
};

module.exports = sendEmail;
