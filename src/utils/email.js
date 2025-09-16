// Amazon SES configuration for multilingual transactional emails
import { getTranslations } from './translations.js'

// Email templates for different languages
const emailTemplates = {
  shipmentConfirmation: {
    en: {
      subject: 'Shipment Confirmation - VCanship',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Shipment Confirmed</h1>
          <p>Dear {{customerName}},</p>
          <p>Your shipment has been confirmed and is being processed.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Shipment Details:</h3>
            <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
            <p><strong>Service:</strong> {{serviceType}}</p>
            <p><strong>From:</strong> {{origin}}</p>
            <p><strong>To:</strong> {{destination}}</p>
            <p><strong>Estimated Delivery:</strong> {{estimatedDelivery}}</p>
          </div>
          <p>You can track your shipment at: <a href="https://www.vcanresources.com/track?id={{trackingNumber}}">Track Shipment</a></p>
          <p>Thank you for choosing VCanship!</p>
        </div>
      `
    },
    es: {
      subject: 'Confirmación de Envío - VCanship',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Envío Confirmado</h1>
          <p>Estimado/a {{customerName}},</p>
          <p>Su envío ha sido confirmado y está siendo procesado.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Detalles del Envío:</h3>
            <p><strong>Número de Seguimiento:</strong> {{trackingNumber}}</p>
            <p><strong>Servicio:</strong> {{serviceType}}</p>
            <p><strong>Desde:</strong> {{origin}}</p>
            <p><strong>Hasta:</strong> {{destination}}</p>
            <p><strong>Entrega Estimada:</strong> {{estimatedDelivery}}</p>
          </div>
          <p>Puede rastrear su envío en: <a href="https://www.vcanresources.com/track?id={{trackingNumber}}">Rastrear Envío</a></p>
          <p>¡Gracias por elegir VCanship!</p>
        </div>
      `
    },
    de: {
      subject: 'Sendungsbestätigung - VCanship',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Sendung Bestätigt</h1>
          <p>Liebe/r {{customerName}},</p>
          <p>Ihre Sendung wurde bestätigt und wird bearbeitet.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Sendungsdetails:</h3>
            <p><strong>Sendungsnummer:</strong> {{trackingNumber}}</p>
            <p><strong>Service:</strong> {{serviceType}}</p>
            <p><strong>Von:</strong> {{origin}}</p>
            <p><strong>Nach:</strong> {{destination}}</p>
            <p><strong>Voraussichtliche Lieferung:</strong> {{estimatedDelivery}}</p>
          </div>
          <p>Sie können Ihre Sendung verfolgen unter: <a href="https://www.vcanresources.com/track?id={{trackingNumber}}">Sendung Verfolgen</a></p>
          <p>Vielen Dank, dass Sie VCanship gewählt haben!</p>
        </div>
      `
    }
  }
}

// Amazon SES configuration
export const sesConfig = {
  region: 'us-east-1', // Change to your preferred region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  fromEmail: 'noreply@vcanresources.com',
  replyToEmail: 'support@vcanresources.com'
}

// Send email using Amazon SES
export const sendEmail = async (to, templateName, language, data) => {
  try {
    // Get template in requested language, fallback to English
    const template = emailTemplates[templateName]?.[language] || emailTemplates[templateName]?.en
    
    if (!template) {
      throw new Error(`Template ${templateName} not found`)
    }
    
    // Replace template variables
    let subject = template.subject
    let html = template.html
    
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      subject = subject.replace(regex, data[key])
      html = html.replace(regex, data[key])
    })
    
    // SES parameters
    const params = {
      Source: sesConfig.fromEmail,
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [sesConfig.replyToEmail]
    }
    
    // In a real application, you would use AWS SDK to send the email
    console.log('Email would be sent with params:', params)
    
    return {
      success: true,
      messageId: 'mock-message-id-' + Date.now()
    }
    
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Send shipment confirmation email
export const sendShipmentConfirmation = async (customerEmail, language, shipmentData) => {
  return await sendEmail(customerEmail, 'shipmentConfirmation', language, shipmentData)
}

// Validate email configuration
export const validateEmailConfig = () => {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    return {
      valid: false,
      missing: missing,
      message: `Missing required environment variables: ${missing.join(', ')}`
    }
  }
  
  return {
    valid: true,
    message: 'Email configuration is valid'
  }
}

// Setup instructions for Amazon SES
export const getSESSetupInstructions = () => {
  return `
# Amazon SES Setup Instructions

## 1. AWS Account Setup
- Create an AWS account if you don't have one
- Navigate to Amazon SES in the AWS Console
- Verify your domain (vcanresources.com)
- Verify your sender email addresses

## 2. Environment Variables
Add these to your .env file:

AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1

## 3. Domain Verification
Add these DNS records to your IONOS domain:

Type: TXT
Name: _amazonses.vcanresources.com
Value: [Verification token from AWS]

Type: MX
Name: vcanresources.com
Value: 10 feedback-smtp.us-east-1.amazonses.com

## 4. DKIM Setup
Add DKIM CNAME records provided by AWS SES

## 5. Production Access
Request production access in AWS SES console to remove sending limits

## 6. Bounce and Complaint Handling
Set up SNS topics for bounce and complaint notifications
`
}
