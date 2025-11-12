export const generateVerificationEmail = (
  userName: string,
  verifyLink: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hello ${userName},</h2>
      <p>Thank you for registering. Please verify your email by clicking the button below:</p>
      <a 
        href="${verifyLink}" 
        target="_blank" 
        style="
          display: inline-block;
          padding: 10px 20px;
          margin: 10px 0;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        "
      >
        Verify Email
      </a>
      <p>This link will expire in 15 minutes.</p>
    </div>
  `;
};

export const generateWelcomeEmail = (name: string) => `
  <div style="font-family:Arial,sans-serif">
    <h2>Welcome, ${name}!</h2>
    <p>Thanks for joining our platform using your social account.</p>
    <p>We’re glad to have you here 🎉</p>
  </div>
`;
