import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { getChatbotResponse } from './chatbotResponses'; 
import { format } from 'date-fns';

export const createServer = () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다:', socket.id);
    socket.on('sendMessage', (data) => {
      console.log('메시지 수신:', data);

      io.emit('receiveMessage', data);

      setTimeout(() => {
        const formattedTime = format(new Date(), 'h:mma');
        const responseMessage = {
          id: data.id + 1,
          name: '홍길동',
          time: formattedTime, 
          message: getChatbotResponse(data.message), // 챗봇 응답 생성
        };

        io.emit('receiveMessage', responseMessage);
      }, 1000); // 1초 뒤에 응답
    });

    socket.on('disconnect', () => {
      console.log('사용자가 연결을 종료했습니다:', socket.id);
    });
  });

  return server;
};
