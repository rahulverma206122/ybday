const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Gift unlock route
app.post('/api/unlock', (req, res) => {
  const { code } = req.body;

  if (code.toLowerCase().trim() === 'nitya') {
    res.json({
      success: true,
      gifts: [
        { id: 1, name: 'Dress', emoji: '👗', description: 'Tumhare liye ek beautiful dress chunna mere liye sabse mushkil tha — kyunki tum har cheez mein sundar lagti ho!' },
        { id: 2, name: 'Shoes', emoji: '👠', description: 'Cute se shoes — tumhare har kadam ke saath!' },
        { id: 3, name: 'Watch', emoji: '⌚', description: 'Har second, har minute yaad rahe — main hoon tumhare saath!' },
        { id: 4, name: 'Tattoo', emoji: '💉', description: '13 July — tumhari date ab meri ungli pe forever hai! 🖤' },
      ]
    });
  } else {
    res.json({
      success: false,
      message: 'Oops, Thats the wrong code 😂 Try by using your little brain!'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe! 🚀`);
});



