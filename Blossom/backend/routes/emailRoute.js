import { Router } from "express";
import nodemailer from 'nodemailer';
const emailRouter = Router();


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "giridharsaigirugu@gmail.com",
        pass: "Giridhar111"
    }
});

emailRouter.post('/send-email', async (req, res) => {
    const { name, address, eventName, customerEmail, vendorEmail, imageBase64 } = req.body;

    const customerMailOptions = {
        from: 'blossomstoresalbany@gmail.com',
        to: customerEmail,
        subject: `Confirmation for ${eventName}`,
        html: `<h1>Event Confirmation</h1>
      <p>Dear ${name},</p>
      <p>Thank you for planning your event with us! Here are the details:</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Address: ${address}</li>
        <li>Event: ${eventName}</li>
      </ul>
      <p>We look forward to making your event memorable.</p>
      <img src="${imageBase64}" alt="Event Image" />`,
    };

    const vendorMailOptions = {
        from: 'blossomstoresalbany@gmail.com',
        to: vendorEmail,
        subject: `New Event: ${eventName}`,
        html: `<h1>New Event Details</h1>
        <p>Vendor,</p>
        <p>Please see the details for the upcoming event:</p>
        <ul>
          <li>Client Name: ${name}</li>
          <li>Event Address: ${address}</li>
          <li>Event: ${eventName}</li>
        </ul>
        <p>Please prepare the necessary arrangements.</p>
        <img src="${imageBase64}" alt="Event Image" />`,
    };

    try {
        // Send email to the customer and wait for the result
        const customerResult = await transporter.sendMail(customerMailOptions);
        console.log('Customer email sent: ', customerResult);

        // Send email to the vendor and wait for the result
        const vendorResult = await transporter.sendMail(vendorMailOptions);
        console.log('Vendor email sent: ', vendorResult);

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

export default emailRouter;
