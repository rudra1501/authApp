import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken)=>{
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    }
    catch (error){
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
          from: sender,
          to: recipient,
          template_uuid: "82c7e954-80b4-4931-9c20-74cdfb3618ec",
          template_variables: {
            company_info_name: "Auth Company",
            name: name,
          },
        });

        console.log("Welcome email sent successfully", response);
        
    } catch (error) {
        
    }
}

export const sendPasswordResetEmail = async (email, resetURL)=>{
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email)=>{
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset password success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset"
        })

        console.log("Pasword reset success", response);

        
    } catch (error) {
        console.error("Error in send reset success email", error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};