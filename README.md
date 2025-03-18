# Remind.us - Smart Reminder PWA

Remind.us is a Progressive Web App (PWA) for creating and managing reminders using natural language input, images, and voice recordings. The app uses LLM (Large Language Model) technology to analyze user input and generate appropriate reminders with intelligent time estimations.

## Features

- Create reminders using text input, image capture, or voice recording
- AI-powered natural language processing to understand reminder requests
- Intelligent time and date estimation for scheduling reminders
- Conversation interface for interacting with the reminder assistant
- Mark reminders as complete, edit, or delete them
- Multiple notification methods (Push, Email, SMS, Phone calls)
- Priority-based notification delivery system
- Responsive design that works on mobile and desktop devices
- Dark/light theme support and customizable appearance
- Works offline (PWA capabilities)

## Technology Stack

- HTML5, CSS3, and JavaScript (Vanilla)
- Progressive Web App (PWA) with service worker for offline functionality
- Material Design icons
- Responsive design principles

## Project Structure

```
remind-us/
├── index.html          # Main app interface
├── profile.html        # User profile page
├── settings.html       # App settings page
├── theme.html          # Theme customization page
├── manifest.json       # PWA manifest
├── styles/
│   └── main.css        # Shared styles
├── js/
│   ├── app.js          # Main application logic
│   └── sw.js           # Service worker for offline functionality
└── images/
    ├── icon-192.png    # App icon (192x192)
    └── icon-512.png    # App icon (512x512)
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/remind-us.git
   ```

2. Navigate to the project directory:
   ```
   cd remind-us
   ```

3. Serve with a static file server (e.g., using Python's built-in server):
   ```
   python -m http.server 8000
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Usage

- Type a reminder in the input box (e.g., "Remind me to call Mom tomorrow at 6 PM")
- Use the camera icon to capture an image (e.g., taking a picture of medicine to set a medication reminder)
- Use the microphone icon to record a voice message with your reminder
- View your reminders in the cards section at the top of the app
- Mark reminders as complete, edit, or delete them using the action buttons

## Notification System

The app features a sophisticated notification system with multiple delivery methods:

- **Push Notifications**: Browser-based notifications delivered even when the app is closed
- **Email Notifications**: Reminders sent to your registered email address
- **SMS Notifications**: Text message reminders to your phone
- **Phone Call Notifications**: Automated calls for critical reminders

Notifications can be customized based on reminder priority:
- **Normal**: Standard reminders (defaults to Push + Email)
- **Important**: Higher priority reminders like meetings (defaults to Push + SMS)
- **Critical**: Urgent reminders like medication (defaults to all methods)

Users can configure notification preferences in both the Profile and Settings pages.

## Future Enhancements

- Integration with a real LLM API for advanced natural language processing
- Backend server for user account management
- Push notifications for reminder alerts
- Calendar integration
- Recurring reminders
- Sharing reminders with others

## License

This project is licensed under the MIT License - see the LICENSE file for details. 