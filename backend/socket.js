const { generateCard } = require('./services/geminiService');
const { delay } = require('./utils/delay');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('generate_cards', async (data) => {
      const { topic, mode } = data;
      console.log(`Generating cards for topic: ${topic}, Mode: ${mode}`);
      
      try {
        for (let i = 1; i <= 3; i++) {
          if (mode === 'Failure Mode' && i === 3) {
            console.log('Simulating intentional failure for card 3');
            socket.emit('generation_error', { cardIndex: i, message: 'Card generation failed.' });
            return; // Stop generation
          }

          const card = await generateCard(topic, i, 3);
          socket.emit('card_generated', { cardIndex: i, card });
          
          if (i < 3) {
            await delay(1000); // 1 second delay
          }
        }
        
        socket.emit('generation_complete', { message: 'All cards generated successfully!' });
      } catch (error) {
        console.error('Error generating cards:', error);
        socket.emit('generation_error', { cardIndex: 0, message: 'Internal Server Error' });
      }
    });

    socket.on('retry_card', async (data) => {
      const { topic, cardIndex } = data;
      console.log(`Retrying card ${cardIndex} for topic: ${topic}`);
      
      try {
        const card = await generateCard(topic, cardIndex, 3);
        socket.emit('card_generated', { cardIndex, card });
        
        // Since it's retry for card 3, and only one card failed
        socket.emit('generation_complete', { message: 'All cards generated successfully!' });
      } catch (error) {
        console.error('Error retrying card:', error);
        socket.emit('generation_error', { cardIndex, message: 'Retry failed.' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
