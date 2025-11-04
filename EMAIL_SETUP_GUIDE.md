# Email Setup Guide for KabaHub Contact Form

This guide will help you configure the contact form to send emails to kabahubteam@gmail.com using EmailJS.

## Prerequisites

- Gmail account: kabahubteam@gmail.com
- EmailJS account (free)

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (or **Dashboard** if you have an account)
3. Create a free account

### 2. Add Email Service (Gmail)

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account**
5. Sign in with kabahubteam@gmail.com
6. Grant EmailJS the necessary permissions
7. Give your service a name (e.g., "KabaHub Gmail")
8. Click **Create Service**
9. **Copy the Service ID** (you'll need this later)

### 3. Create Email Template

1. In the EmailJS dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Use the following template:

**Template Settings:**

- Template Name: `kabahub_contact_form`

**Email Content:**

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from the KabaHub contact form.
```

**Template Variables:**

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content

4. Click **Save**
5. **Copy the Template ID** (you'll need this later)

### 4. Get Your Public Key

1. In the EmailJS dashboard, go to **Account** (top right)
2. Find the **API Keys** section
3. **Copy your Public Key** (starts with something like "user\_...")

### 5. Update Configuration File

1. Open `src/emailConfig.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "your_actual_service_id", // From step 2
  TEMPLATE_ID: "your_actual_template_id", // From step 3
  PUBLIC_KEY: "your_actual_public_key", // From step 4
};
```

### 6. Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the contact section
3. Fill out the form with test data
4. Submit the form
5. Check kabahubteam@gmail.com for the test email

## Important Security Notes

⚠️ **NEVER commit your actual EmailJS credentials to a public repository!**

For production, consider using environment variables:

1. Create a `.env` file in your project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update `src/emailConfig.js`:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
```

3. Add `.env` to your `.gitignore` file

## EmailJS Free Tier Limits

- 200 emails/month
- Rate limit: 2 requests/second

For higher limits, upgrade to a paid plan.

## Troubleshooting

### Emails not sending?

1. Check browser console for errors
2. Verify your EmailJS credentials are correct
3. Make sure you granted Gmail permissions to EmailJS
4. Check your EmailJS dashboard for quota limits
5. Verify kabahubteam@gmail.com can receive emails

### Emails going to spam?

1. In EmailJS dashboard, verify your email service
2. Consider setting up SPF/DKIM records (advanced)
3. Ask recipients to mark your emails as "Not Spam"

## Alternative Solutions

If EmailJS doesn't work for you, consider these alternatives:

1. **Formspree** - [https://formspree.io/](https://formspree.io/)
2. **SendGrid** - [https://sendgrid.com/](https://sendgrid.com/)
3. **Netlify Forms** - If hosting on Netlify
4. **Custom Backend** - Build your own API with Node.js/Express

## Support

If you need help, contact the development team or refer to:

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: support@emailjs.com
