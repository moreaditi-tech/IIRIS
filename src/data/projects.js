export const projects = [
  {
    id: "01",
    title: "Neuro Eye Controlled Toy Car",
    creators: "Pratik Lanjewar, Tejas Bankar",
    description: "Addresses mobility challenges for individuals who cannot use traditional assistive devices requiring physical controls. Uses Brain–Computer Interface technology for hands-free control through EEG brain signals and EOG eye movements. EEG controls forward and stop movement while EOG controls left and right navigation. Bio-signals are captured using the BioAmp EXG Pill and processed in real time using an Arduino microcontroller. Demonstrates a low-cost proof of concept for non-invasive assistive control.",
    technologies: ["BCI", "EEG", "EOG", "BioAmp EXG Pill", "Arduino"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "02",
    title: "Robotic Gesture-Controlled Obstacle-Avoiding Vehicle for Disaster Recovery Applications",
    creators: "Atharv Rao",
    description: "System is controlled through physical hand/body movement rather than traditional buttons or joysticks. Tilting or moving the hand enables forward, backward, left and right commands. Accelerometer and gyroscope sensors detect orientation and motion. Serves as a proof of concept for disaster recovery and hazardous environments.",
    technologies: ["Accelerometer", "Gyroscope", "Robotics", "Sensors"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "03",
    title: "A Cloud-Integrated IoT–RFID Attendance System Featuring Real-Time Web Monitoring, Selfie Verification, and Analytics",
    creators: "Vaishnavi Kadam, Akshata Majgaonkar",
    description: "Automates attendance using RFID tags. Includes selfie verification and location-based authentication to reduce proxy attendance. Data is stored in a real-time Supabase cloud database. The React + Tailwind dashboard allows teachers to view, filter, analyze and export attendance reports.",
    technologies: ["RFID", "NodeMCU ESP8266", "Supabase", "React", "Tailwind"],
    image: "/images/project-placeholder.jpg",
    externalLink: "https://attendify-iot.vercel.app/",
    driveLink: "https://drive.google.com/drive/folders/1y39e0T9qRuP_EbVH1UKvlLoVQ49_UonX?usp=drive_link"
  },
  {
    id: "04",
    title: "IoT Weather Station with Air Quality Monitoring",
    creators: "Shibu Rai, Krishna Shinde",
    description: "Collects real-time temperature, humidity and gas concentration data. Environmental readings are transmitted to a backend server and stored in a cloud-ready database. The React dashboard displays real-time and historical data. Demonstrates IoT, cloud integration and sensor-based data analytics.",
    technologies: ["DHT11", "MQ-5", "Arduino UNO", "Python", "React"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "05",
    title: "AI Assistance for Visually Impaired",
    creators: "Sai Veer, Manaswi Shinde",
    description: "Provides real-time audio feedback using text-to-speech and processes camera input at 30 FPS. Supports currency recognition (Indian denominations ₹10 to ₹2000), obstacle awareness, social interaction and navigation. Provides desktop and web interfaces for accessibility.",
    technologies: ["MobileNetV2", "YOLOv3", "LBPH", "Python", "OpenCV", "TensorFlow"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "06",
    title: "PNEUMALUX: HOME AUTOMATION USING VOICE ASSISTANT",
    creators: "Harshal Patil, Mayuresh Choudhary",
    description: "Voice-controlled home automation. Natural spoken commands are converted through cloud speech recognition into digital signals routed to a local microcontroller. A low-cost proof of concept for smart homes, energy management and assistive technology.",
    technologies: ["Voice Recognition", "Cloud Integration", "Microcontroller", "IoT"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "07",
    title: "IoT Based Multi-Hazard Detection & Alert System",
    creators: "Adiyan Baig, Ishita Deb",
    description: "Monitors fire, gas leaks, temperature, and vibrations. Sensor values are processed locally and uploaded to a cloud dashboard. Achieves sub-2-second alert times. Upgradable for flood sensors, GSM/LoRa communication and AI-based hazard prediction.",
    technologies: ["ESP8266", "Low-cost sensors", "Buzzer", "LEDs", "LCD", "Cloud Dashboard"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "08",
    title: "IoT Based Smart Flame Detection System",
    creators: "Vedant Sable, Sarthak Waghere",
    description: "Smart flame-detection and firefighting robot. Autonomously detects fire, navigates toward the source and performs targeted water spraying. Performs real-time local decision-making without requiring internet/cloud connectivity.",
    technologies: ["IR flame sensors", "Arduino", "Servo", "Water pump", "Motor driver", "DC motors"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "09",
    title: "IoT Based Automatic Radar Missile Launcher",
    creators: "Datta Sable, Prasanjeet Shirsat",
    description: "Educational prototype where an ultrasonic sensor continuously scans an area. Arduino processes distance data and controls horizontal and vertical servo rotation. The dual-axis platform tracks and locks onto a target direction, culminating in a simulated launch. Operates locally without internet.",
    technologies: ["Ultrasonic sensor", "Arduino Uno", "Servo motors", "Mechatronics"],
    image: "/images/project-placeholder.jpg"
  },
  {
    id: "10",
    title: "Fortknock: Dynamic Knock Based Security System",
    creators: "Aditya Bhende, Atharva Naik",
    description: "Replaces traditional keys with tactile security using specific knock patterns (like Morse code). A piezoelectric sensor captures vibrations processed by an Arduino. The required pattern can be periodically randomized through a mobile app. Defends against buffer overflows and injection attacks.",
    technologies: ["Piezoelectric sensor", "Arduino", "Bluetooth", "Wi-Fi", "Mobile App"],
    image: "/images/project-placeholder.jpg"
  }
];
