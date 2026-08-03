package com.trash2track.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("t2tsmartech@gmail.com");
            message.setTo(email);
            message.setSubject("Trash2Track Email Verification");

            message.setText(
                    "Your verification code is: " + otp +
                    "\nThis code expires in 5 minutes."
            );

            mailSender.send(message);

            System.out.println("✅ Email sent successfully to: " + email);

        } catch (Exception e) {

            System.out.println("❌ Failed to send email");
            e.printStackTrace();
        }
    }
}