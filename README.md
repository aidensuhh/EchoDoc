EchoDoc
💡 Inspiration 
In today's healthcare landscape, doctors are increasingly overwhelmed with patient communications and appointment scheduling, leading to burnout and reduced quality of care. Studies show that primary care physicians spend over 50% of their workday on administrative tasks rather than direct patient care. The healthcare industry loses approximately $150 billion annually due to inefficient communication and scheduling systems.
🔍 What it does
EchoDoc revolutionizes patient care management by creating AI-powered voice clones of doctors that can handle routine patient communications and appointment scheduling autonomously. This system allows doctors to maintain personal connections with patients while reducing administrative burden.
AI agents with cloned doctor voices handle patient calls and appointment scheduling
Personalized patient profiles ensure contextually aware responses based on medical history
Dynamic calendar integration for real-time appointment management
Secure handling of sensitive medical information and patient records
🖥️ How we built it
Frontend: Next.js 15 with App Router, TailwindCSS, Shadcn UI
Backend: Express.js
Authentication: Clerk
Database: Supabase
AI Integration: ElevenLabs for voice cloning, Gemini AI for text generation and conversation.
Communication: Twilio for call handling
🤔 Challenges we ran into 
One of the main challenges was implementing real-time voice cloning that maintains the doctor's natural speaking patterns while ensuring the AI responses remain medically appropriate and safe. We also had to carefully handle the complexity of dynamic calendar updates across multiple concurrent AI agent calls, ensuring no double-booking or scheduling conflicts occurred.
🎉 Accomplishments that we're proud of 
We successfully created a system that seamlessly integrates voice cloning technology with AI-driven patient interaction, maintaining the personal touch of doctor-patient relationships while automating routine tasks. The system's ability to parse and utilize patient records for contextual responses while maintaining strict medical privacy standards is particularly noteworthy.
📕 What we learned 
This project taught us how to effectively combine multiple cutting-edge technologies - from voice cloning to real-time AI text generation - while maintaining HIPAA compliance and medical ethics standards. We gained valuable experience in creating systems that handle sensitive medical data while providing practical utility for healthcare providers.
⭐ What's next for EchoDoc
Future developments include:
Expanding the system to handle more complex medical conversations
Adding support for multiple languages
Implementing more sophisticated appointment optimization algorithms
Developing emergency situation detection and escalation protocols
Creating a mobile app for doctors to monitor and manage their AI agents
Integrating with existing Electronic Health Record (EHR) systems
Continuing to build the calendar integration system.

How to run it:
cd backend/express-server then run npm install then npm run dev

then another terminal, cd frontend then run npm install then npm run dev

then in another terminal you'll need to run ngrok or unicorn to expose the backend server so twilio can actually call it.

then fill in the environment variables in an .env file in backend folder.
