// Main application JavaScript for RemindUs PWA

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidePanel = document.getElementById('sidePanel');
    const menuBtn = document.getElementById('menuBtn');
    const closePanel = document.getElementById('closePanel');
    const mainContent = document.querySelector('.main-content');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cameraBtn = document.getElementById('cameraBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const sendBtn = document.getElementById('sendBtn');
    const reminderInput = document.getElementById('reminderInput');
    const conversationContainer = document.getElementById('conversationContainer');
    const reminderCards = document.getElementById('reminderCards');
    
    // Edit reminder modal elements
    const editReminderModal = document.getElementById('editReminderModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const editReminderForm = document.getElementById('editReminderForm');
    const editReminderId = document.getElementById('editReminderId');
    const editTitle = document.getElementById('editTitle');
    const editDescription = document.getElementById('editDescription');
    const editDueDate = document.getElementById('editDueDate');
    const editPriority = document.getElementById('editPriority');
    const editStatus = document.getElementById('editStatus');
    const saveReminderBtn = document.getElementById('saveReminderBtn');
    
    // Reminder alert modal elements
    const reminderAlertModal = document.getElementById('reminderAlertModal');
    const closeReminderAlert = document.getElementById('closeReminderAlert');
    const alertReminderTitle = document.getElementById('alertReminderTitle');
    const alertReminderDescription = document.getElementById('alertReminderDescription');
    const alertReminderPriority = document.getElementById('alertReminderPriority');
    const snoozeReminderBtn = document.getElementById('snoozeReminderBtn');
    const completeReminderBtn = document.getElementById('completeReminderBtn');
    
    // Array to store timer IDs for cleanup
    let reminderTimers = {};

    // Sample reminders for demonstration
    const sampleReminders = [
        {
            id: 1,
            title: 'Team Meeting',
            description: 'Weekly team sync at the conference room',
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
            status: 'upcoming',
            priority: 'important'
        },
        {
            id: 2,
            title: 'Doctor Appointment',
            description: 'Annual checkup at Dr. Smith\'s office',
            dueDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            status: 'overdue',
            priority: 'important'
        },
        {
            id: 3,
            title: 'Buy Groceries',
            description: 'Get milk, eggs, and vegetables',
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
            status: 'upcoming',
            priority: 'normal'
        },
        {
            id: 4,
            title: 'Take Medication',
            description: 'Take blood pressure medicine with breakfast',
            dueDate: new Date(Date.now() + 1000 * 60), // 30 minutes from now
            status: 'upcoming',
            priority: 'critical'
        }
    ];

    // Toggle side panel
    menuBtn.addEventListener('click', () => {
        sidePanel.classList.add('open');
        if (window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden';
        }
    });

    closePanel.addEventListener('click', () => {
        sidePanel.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Handle modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('open');
    });

    // Handle close buttons for all modals
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('open');
            }
        });
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('open');
        }
    });

    // Close modal when clicking outside
    editReminderModal.addEventListener('click', (e) => {
        if (e.target === editReminderModal) {
            editReminderModal.classList.remove('open');
        }
    });
    
    // Handle form submission
    editReminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveEditedReminder();
    });

    // Handle input actions
    sendBtn.addEventListener('click', sendMessage);
    reminderInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    cameraBtn.addEventListener('click', () => {
        // In a real app, this would open the device camera
        alert('Camera functionality would open here');
        // For demonstration purposes, we'll simulate sending an image message
        const imageMessage = "I took a picture of my medicine bottle, please remind me to take it twice daily at 9 AM and 9 PM";
        reminderInput.value = imageMessage;
    });

    voiceBtn.addEventListener('click', () => {
        // In a real app, this would start voice recording
        alert('Voice recording would start here');
        // For demonstration purposes, we'll simulate sending a voice message
        const voiceMessage = "Remind me to call mom tomorrow at 6 PM";
        reminderInput.value = voiceMessage;
    });

    // Render initial reminders
    renderReminders();
    
    // Start countdowns for all upcoming reminders
    startReminderCountdowns();

    // Functions
    function sendMessage() {
        const message = reminderInput.value.trim();
        if (message === '') return;

        // Add user message to conversation
        addMessageToConversation(message, 'user');
        
        // Clear input
        reminderInput.value = '';
        
        // Simulate AI processing and response
        setTimeout(() => {
            // In a real app, this would call an LLM API
            const responseText = processUserInput(message);
            addMessageToConversation(responseText, 'assistant');
            
            // Add the reminder to the list if applicable
            if (message.toLowerCase().includes('remind')) {
                addNewReminder(message);
            }
        }, 1000);
    }

    function addMessageToConversation(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        messageDiv.appendChild(paragraph);
        conversationContainer.appendChild(messageDiv);
        
        // Scroll to bottom of conversation
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }

    function processUserInput(input) {
        // This is a mock LLM processing function
        // In a real app, this would call an API to process the input
        
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('remind') && inputLower.includes('meeting')) {
            return "I've created a reminder for your meeting. When would you like to be reminded?";
        } else if (inputLower.includes('remind') && inputLower.includes('call')) {
            return "I'll remind you to make that call. I've set it for the time you specified.";
        } else if (inputLower.includes('remind') && inputLower.includes('medicine')) {
            return "I've set reminders for your medication twice daily at 9 AM and 9 PM.";
        } else if (inputLower.includes('remind')) {
            return "I've created that reminder for you. Is there anything else you'd like to add to it?";
        } else {
            return "I'm not sure I understood that as a reminder. Could you please rephrase it starting with 'remind me to...'?";
        }
    }

    function renderReminders() {
        reminderCards.innerHTML = '';
        
        if (sampleReminders.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No reminders yet. Create one below!';
            reminderCards.appendChild(emptyMessage);
            return;
        }
        
        sampleReminders.forEach(reminder => {
            const card = createReminderCard(reminder);
            reminderCards.appendChild(card);
        });
        
        // Reset and restart all countdowns after rendering
        clearReminderCountdowns();
        startReminderCountdowns();
    }

    function createReminderCard(reminder) {
        const card = document.createElement('div');
        card.className = `reminder-card ${reminder.status}`;
        if (reminder.priority) {
            card.classList.add(`priority-${reminder.priority}`);
        }
        card.id = `reminder-${reminder.id}`;
        
        const title = document.createElement('h3');
        title.textContent = reminder.title;
        
        const description = document.createElement('p');
        description.textContent = reminder.description;
        
        const timeInfo = document.createElement('p');
        timeInfo.className = 'time-info';
        timeInfo.textContent = formatDate(reminder.dueDate);
        timeInfo.id = `countdown-${reminder.id}`;
        
        // Add priority badge if it's important or critical
        if (reminder.priority === 'important' || reminder.priority === 'critical') {
            const priorityBadge = document.createElement('span');
            priorityBadge.className = `priority-badge ${reminder.priority}`;
            priorityBadge.textContent = reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1);
            timeInfo.appendChild(document.createTextNode(' • '));
            timeInfo.appendChild(priorityBadge);
        }
        
        const actions = document.createElement('div');
        actions.className = 'reminder-actions';
        
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<span class="material-icons">check_circle</span>';
        completeBtn.title = 'Mark as complete';
        completeBtn.addEventListener('click', () => {
            reminder.status = reminder.status === 'completed' ? 'upcoming' : 'completed';
            renderReminders();
        });
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<span class="material-icons">edit</span>';
        editBtn.title = 'Edit reminder';
        editBtn.addEventListener('click', () => {
            openEditModal(reminder);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
        deleteBtn.title = 'Delete reminder';
        deleteBtn.addEventListener('click', () => {
            const index = sampleReminders.findIndex(r => r.id === reminder.id);
            if (index !== -1) {
                sampleReminders.splice(index, 1);
                renderReminders();
            }
        });
        
        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(timeInfo);
        card.appendChild(actions);
        
        // Start countdown for this reminder if it's not completed
        if (reminder.status !== 'completed') {
            startCountdown(reminder);
        }
        
        return card;
    }

    function startReminderCountdowns() {
        sampleReminders.forEach(reminder => {
            if (reminder.status === 'upcoming') {
                startCountdown(reminder);
            }
        });
    }

    function clearReminderCountdowns() {
        Object.values(reminderTimers).forEach(timer => {
            clearInterval(timer);
        });
        reminderTimers = {};
    }

    function startCountdown(reminder) {
        const countdownElement = document.getElementById(`countdown-${reminder.id}`);
        if (!countdownElement) return;

        // Clear any existing timer for this reminder
        if (reminderTimers[reminder.id]) {
            clearInterval(reminderTimers[reminder.id]);
        }

        // Update countdown immediately
        updateCountdownDisplay(reminder, countdownElement);

        // Update countdown every second
        reminderTimers[reminder.id] = setInterval(() => {
            updateCountdownDisplay(reminder, countdownElement);
        }, 1000); // Update every second
    }

    function updateCountdownDisplay(reminder, countdownElement) {
        const now = new Date();
        const diff = reminder.dueDate - now;
        
        if (diff <= 0) {
            // Time's up! Show the reminder alert
            showReminderAlert(reminder);
            clearInterval(reminderTimers[reminder.id]);
            delete reminderTimers[reminder.id];
        } else {
            // Update the countdown display
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            let displayText = 'Due in ';
            if (days > 0) {
                displayText += `${days}d ${hours % 24}h`;
            } else if (hours > 0) {
                displayText += `${hours}h ${minutes % 60}m`;
            } else if (minutes > 0) {
                displayText += `${minutes}m ${seconds % 60}s`;
            } else {
                displayText += `${seconds}s`;
            }

            // Update only the text content while preserving the priority badge
            const priorityBadge = countdownElement.querySelector('.priority-badge');
            if (priorityBadge) {
                // If there's a priority badge, update only the text before it
                const textNode = countdownElement.firstChild;
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                    textNode.textContent = displayText;
                } else {
                    // If no text node exists, create one
                    countdownElement.insertBefore(document.createTextNode(displayText + ' • '), priorityBadge);
                }
            } else {
                // If no priority badge, just update the text content
                countdownElement.textContent = displayText;
            }
        }
    }

    function showReminderAlert(reminder) {
        // Set the priority data attribute
        reminderAlertModal.setAttribute('data-priority', reminder.priority || 'normal');

        // Populate the alert modal with reminder details
        alertReminderTitle.textContent = reminder.title;
        alertReminderDescription.textContent = reminder.description;
        
        // Set priority badge
        alertReminderPriority.innerHTML = '';
        if (reminder.priority === 'critical' || reminder.priority === 'important') {
            const priorityBadge = document.createElement('span');
            priorityBadge.className = `priority-badge ${reminder.priority}`;
            priorityBadge.textContent = reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1);
            alertReminderPriority.appendChild(priorityBadge);
        }
        
        // Play notification sound
        console.log('Playing sound for priority:', reminder.priority);
        playNotificationSound(reminder.priority);

        // Show the modal
        reminderAlertModal.classList.add('open');

        
        // Request notification permission and show browser notification
        if (Notification.permission === 'granted') {
            new Notification('Reminder Alert!', {
                body: reminder.title,
                icon: 'images/icon-192.png'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Reminder Alert!', {
                        body: reminder.title,
                        icon: 'images/icon-192.png'
                    });
                }
            });
        }
        
        // Update reminder status to overdue
        reminder.status = 'overdue';
        renderReminders();
    }

    function playNotificationSound(priority) {
        const audio = new Audio();

        // Set the audio source based on priority
        let soundPath;
        switch (priority) {
            case 'critical':
                soundPath = 'sounds/critical-alert.mp3';
                audio.volume = 1.0;
                break;
            case 'important':
                soundPath = 'sounds/important-alert.mp3';
                audio.volume = 0.8;
                break;
            default:
                soundPath = 'sounds/alert.mp3';
                audio.volume = 0.6;
        }

        // Add error handling for audio loading
        audio.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
            // Try to play a fallback sound
            try {
                const fallbackAudio = new Audio('sounds/alert.mp3');
                fallbackAudio.volume = 0.6;
                fallbackAudio.play().catch(error => console.error('Fallback audio error:', error));
            } catch (error) {
                console.error('Failed to play fallback sound:', error);
            }
        });

        // Set the audio source and play
        audio.src = soundPath;

        // Add a small delay to ensure the audio is loaded
        setTimeout(() => {
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
                // Try to play a fallback sound
                try {
                    const fallbackAudio = new Audio('sounds/alert.mp3');
                    fallbackAudio.volume = 0.6;
                    fallbackAudio.play().catch(error => console.error('Fallback audio error:', error));
                } catch (error) {
                    console.error('Failed to play fallback sound:', error);
                }
            });
        }, 100);
    }

    // Add event listeners for reminder alert modal
    closeReminderAlert.addEventListener('click', () => {
        reminderAlertModal.classList.remove('open');
    });

    reminderAlertModal.addEventListener('click', (e) => {
        if (e.target === reminderAlertModal) {
            reminderAlertModal.classList.remove('open');
        }
    });

    snoozeReminderBtn.addEventListener('click', () => {
        const currentReminder = sampleReminders.find(r => r.title === alertReminderTitle.textContent);
        if (currentReminder) {
            // Add 10 minutes to the due date
            currentReminder.dueDate = new Date(currentReminder.dueDate.getTime() + 10 * 60 * 1000);
            reminderAlertModal.classList.remove('open');
            renderReminders();
        }
    });

    completeReminderBtn.addEventListener('click', () => {
        const currentReminder = sampleReminders.find(r => r.title === alertReminderTitle.textContent);
        if (currentReminder) {
            currentReminder.status = 'completed';
            reminderAlertModal.classList.remove('open');
            renderReminders();
        }
    });

    function addNewReminder(message) {
        // In a real app, this would parse the message using LLM
        // For demo purposes, we'll create a simple reminder based on the message
        
        // Determine priority level based on message content
        let priority = 'normal';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || 
            lowerMessage.includes('urgent') || lowerMessage.includes('critical')) {
            priority = 'critical';
        } else if (lowerMessage.includes('important') || lowerMessage.includes('meeting') || 
                  lowerMessage.includes('appointment') || lowerMessage.includes('deadline')) {
            priority = 'important';
        }
        
        const newReminder = {
            id: sampleReminders.length + 1,
            title: extractTitle(message),
            description: message,
            dueDate: estimateDueDate(message),
            status: 'upcoming',
            priority: priority
        };
        
        sampleReminders.push(newReminder);
        renderReminders();
        
        // Schedule notifications for the new reminder
        scheduleNotifications(newReminder);
        
        // Start countdown for the new reminder
        startCountdown(newReminder);
    }
    
    function scheduleNotifications(reminder) {
        console.log(`Scheduling notifications for "${reminder.title}" with priority: ${reminder.priority}`);
        
        // Simulate setting up notifications based on priority
        // In a real app, this would use the Notification API, email service, etc.
        const timeUntilDue = reminder.dueDate - new Date();
        if (timeUntilDue <= 0) return; // Don't schedule if already due
        
        // Log notification types that would be sent
        let notificationMethods = [];
        
        switch (reminder.priority) {
            case 'critical':
                notificationMethods = ['push', 'email', 'sms'];
                // For critical reminders, also add phone call if enabled
                if (document.getElementById('callToggle') && 
                    document.getElementById('callToggle').checked) {
                    notificationMethods.push('call');
                }
                break;
            case 'important':
                notificationMethods = ['push', 'sms'];
                // For important reminders, add email if enabled
                if (document.getElementById('emailToggle') && 
                    document.getElementById('emailToggle').checked) {
                    notificationMethods.push('email');
                }
                break;
            default: // normal
                notificationMethods = ['push'];
                // For normal reminders, add email if enabled
                if (document.getElementById('emailToggle') && 
                    document.getElementById('emailToggle').checked) {
                    notificationMethods.push('email');
                }
                break;
        }
        
        // Log what would happen in a real app
        console.log(`Will send ${notificationMethods.join(', ')} notifications for "${reminder.title}"`);
        console.log(`First notification scheduled for: ${new Date(Date.now() + Math.min(timeUntilDue, 1000 * 60 * 60))}`);
    }

    function extractTitle(message) {
        // Simple extraction logic - in a real app this would be more sophisticated
        const reminderPart = message.toLowerCase().split('remind me to ')[1];
        if (!reminderPart) return 'New Reminder';
        
        const title = reminderPart.split(' ').slice(0, 3).join(' ');
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    function estimateDueDate(message) {
        // Simple date estimation - in a real app this would use sophisticated NLP
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('tomorrow')) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        } else if (lowerMessage.includes('next week')) {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            return nextWeek;
        } else if (lowerMessage.includes('tonight')) {
            const tonight = new Date();
            tonight.setHours(20, 0, 0, 0);
            return tonight;
        } else if (lowerMessage.includes('minute')) {
            return new Date(Date.now() + 1000 * 60);
        } else {
            // Default: 1 hour from now
            return new Date(Date.now() + 1000 * 60 * 60);
        }
    }

    function formatDate(date) {
        const now = new Date();
        const diff = Math.floor((date - now) / 1000); // diff in seconds
        
        if (diff < 0) {
            const minutes = Math.abs(Math.floor(diff / 60));
            const seconds = Math.abs(diff % 60);
            return `Overdue by ${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else if (diff < 60) {
            return `Due in ${diff} seconds`;
        } else if (diff < 60 * 60) {
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            return `Due in ${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else if (diff < 60 * 60 * 24) {
            const hours = Math.floor(diff / (60 * 60));
            const minutes = Math.floor((diff % (60 * 60)) / 60);
            return `Due in ${hours}h ${minutes}m`;
        } else {
            const days = Math.floor(diff / (60 * 60 * 24));
            const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
            return `Due in ${days}d ${hours}h`;
        }
    }

    // Theme toggle functionality
    const themeLink = document.getElementById('themeLink');
    themeLink.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // In a real app, save the preference to localStorage
    });
    
    // Edit reminder modal functionality
    // Open edit modal and populate with reminder data
    function openEditModal(reminder) {
        // Populate form fields with reminder data
        editReminderId.value = reminder.id;
        editTitle.value = reminder.title;
        editDescription.value = reminder.description;
        
        // Format date for datetime-local input
        const dueDate = new Date(reminder.dueDate);
        dueDate.setMinutes(dueDate.getMinutes() - dueDate.getTimezoneOffset());
        editDueDate.value = dueDate.toISOString().slice(0, 16);
        
        // Set priority and status dropdowns
        editPriority.value = reminder.priority || 'normal';
        editStatus.value = reminder.status || 'upcoming';
        
        // Show the modal
        editReminderModal.classList.add('open');
    }
    
    // Save edited reminder data
    function saveEditedReminder() {
        const id = parseInt(editReminderId.value);
        const index = sampleReminders.findIndex(r => r.id === id);
        
        if (index !== -1) {
            // Create a new reminder object with updated values
            const updatedReminder = {
                ...sampleReminders[index], // Keep existing reminder data
                title: editTitle.value,
                description: editDescription.value,
                priority: editPriority.value,
                status: editStatus.value
            };
            
            // Fix date conversion by adding timezone offset back
            const dueDate = new Date(editDueDate.value);
            dueDate.setMinutes(dueDate.getMinutes() + dueDate.getTimezoneOffset());
            updatedReminder.dueDate = dueDate;
            
            // Update the reminder in the array
            sampleReminders[index] = updatedReminder;
            
            // Close the modal and refresh the display
            editReminderModal.classList.remove('open');
            renderReminders();
            
            // Provide feedback to the user
            addMessageToConversation(`I've updated your reminder: "${editTitle.value}"`, 'assistant');
        }
    }
}); 