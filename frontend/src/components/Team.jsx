import React from 'react';
import '../styles/Team.css'; // Custom CSS for styling
import meghna from '../assets/teamImages/elon.jpg'
import priyanshu from '../assets/teamImages/elon.jpg'
import kanishk from '../assets/teamImages/elon.jpg'
import puru from '../assets/teamImages/elon.jpg'
import namrata from '../assets/teamImages/elon.jpg'
import rudra from '../assets/teamImages/elon.jpg'
import harshMehta from '../assets/teamImages/elon.jpg'
import sajal from '../assets/teamImages/elon.jpg'
import anuj from '../assets/teamImages/elon.jpg'
import bhoomi from '../assets/teamImages/elon.jpg'
import daksh from '../assets/teamImages/elon.jpg'
import harshSangani from '../assets/teamImages/elon.jpg'
import harsha from '../assets/teamImages/elon.jpg'
import ishita from '../assets/teamImages/elon.jpg'
import jignesh from '../assets/teamImages/elon.jpg'
import keshav from '../assets/teamImages/elon.jpg'
import tanvi from '../assets/teamImages/elon.jpg'
import abhi from '../assets/teamImages/elon.jpg'
import harshSharma from '../assets/teamImages/elon.jpg'
import pradyuman from '../assets/teamImages/elon.jpg'

const teamData = {
  facultyCoordinator: { name: 'Mrs. Meghna Sharma', image: meghna },
  president: { name: 'Priyanshu Sharma', image: priyanshu },
  chapterLead: { name: 'Kanishk Kumawat', image: kanishk },
  coLeads: [
    { name: 'Puru Gupta', image: puru },
    { name: 'Namrata Patel', image: namrata },
  ],
  leads: [
    { name: 'Rudra Sharma', position: 'Technical Head', image: rudra },
    { name: 'Harsh Mehta', position: 'Operations Head', image: harshMehta },
    { name: 'Sajal Bothra', position: 'PR & Outreach Head', image: sajal },
  ],
  technicalTeam: [
    { name: 'Anuj Goyal', position: 'Core Team Member', image: anuj },
    { name: 'Bhoomi Agarwal', position: 'Core Team Member', image: bhoomi },
    { name: 'Daksh Bansal', position: 'Core Team Member', image: daksh },
    { name: 'Harsh Sangani', position: 'Core Team Member', image: harshSangani },
    { name: 'Harsha Khatri', position: 'Core Team Member', image: harsha },
    { name: 'Ishita Ahluwalia', position: 'Core Team Member', image: ishita },
    { name: 'Jignesh', position: 'Core Team Member', image: jignesh },
    { name: 'Keshav Sharma', position: 'Core Team Member', image: keshav },
    { name: 'Tanvi Tater', position: 'Core Team Member', image: tanvi },
    { name: 'Abhi Somra', position: 'Core Team Member', image: abhi },
    { name: 'Harsh Sharma', position: 'Core Team Member', image: harshSharma },
    { name: 'Pradyuman Shrivastav', position: 'Core Team Member', image: pradyuman },
  ],
  operationsTeam: Array.from({ length: 8 }, (_, i) => ({
    name: `Operations Member ${i + 1}`,
    image: `ops${i + 1}.jpg`,
  })),
  prAndOutreachTeam: Array.from({ length: 10 }, (_, i) => ({
    name: `PR & Outreach Member ${i + 1}`,
    image: `pr${i + 1}.jpg`,
  })),
};

const TeamCard = ({ name, image }) => (
  <div className="team-card">
    <div className="image-section">
      <img src={image} alt={name} />
    </div>
    <div className="name-section">
      <p>{name}</p>
    </div>
  </div>
);

const TeamSection = ({ title, members }) => (
  <div className="team-section">
    <h2>{title}</h2>
    <div className="team-grid">
      {members.map((member, index) => (
        <TeamCard key={index} name={member.name} image={member.image} />
      ))}
    </div>
  </div>
);

const Team = () => {
  return (
    <div className="team-page">
      <h1>Our Team</h1>
      <TeamSection title="Faculty Coordinator" members={[teamData.facultyCoordinator]} />
      <TeamSection title="President" members={[teamData.president]} />
      <TeamSection title="Chapter Lead" members={[teamData.chapterLead]} />
      <TeamSection title="Co-Leads" members={teamData.coLeads} />
      <TeamSection title="Leads" members={teamData.leads} />
      <h1>Core Team</h1>
      <TeamSection title="Technical Team" members={teamData.technicalTeam} />
      <TeamSection title="Operations Team" members={teamData.operationsTeam} />
      <TeamSection title="PR & Outreach Team" members={teamData.prAndOutreachTeam} />
    </div>
  );
};

export default Team;
