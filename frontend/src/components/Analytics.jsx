import { useState, useEffect } from "react";
import { eventAnalytics } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../styles/Analytics.css'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const eventsData = [
//   { name: '8 Ball Pool', value: 23 },
//   { name: 'Code-dangal', value: 56 },
//   { name: 'Street Dance', value: 200 }
// ]

const Analytics = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadEvents = async () => {
    try {
      const eventsData = await eventAnalytics();
      setEventData(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);


  return(
    <div className="analytics-container" style={{ textAlign: 'center', padding: '20px' }}>
    <h2 style={{ color: '#ff6600', fontSize: '2rem' }}>Event Analytics</h2>
    <PieChart className="analytics-data" style={{ margin: "auto" }} width={750} height={500}>
      <Pie
        data={eventData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) =>
          `${name}: ${(percent * 100).toFixed(0)}%`
        }
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {eventData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
  )
}



export default Analytics;