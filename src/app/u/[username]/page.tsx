'use client';
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const page = () => {

  const [messages,setMessages] = useState(["What your choice today ?" , 'What are you looking for ?' , 'find the momentum']);
  const [textArea,setTextArea] = useState('');
  const[isLoading,setIsLoading]  = useState(false);
  const params = useParams();
  const {toast} = useToast();

  const suggestMessage = async() =>{
    setIsLoading(true);
  const res = await axios.post('/api/suggest-messages');  
  const resMessage = res.data.messages?.split('||');
  setMessages(resMessage);
  setIsLoading(false);
  }

  const handleSend = async() =>{
   const res = await axios.post('/api/send-message',{username:'rishabhsingh',content : textArea});
   console.log(res);
  if(res.data?.success !== true){
    toast({
      title: "Error",
      description:"Error sending message",
      variant: "destructive",
    });
    return;
  }
  toast({
    title: "Error",
    description:'Message sent successsfully',
  });
  }

  return (
    <div>
      <h3 className='text-5xl text-center font-semibold'>Public Profile link</h3>
      <div className=" grid w-full gap-1.5 m-2 p-4">
      <Label htmlFor="message">Send anonymous messages to @{params?.username}</Label>
      <Textarea placeholder="Type your message here." id="message" value={textArea} onChange={(e)=>setTextArea(e.target.value)} />
      <Button  onClick={handleSend} className='align-center w-1/4 mx-auto'>Send it</Button>
    </div>
    <div>
      <Button className='my-4 mx-8' onClick = {suggestMessage}>Suggest Messages</Button>
      <p>Click on any below message to select it.</p>
      <div className='w-full pt-4'>
        <h1 className='text-3xl font-semibold'>Messages</h1>
        { messages.map((item,index)=>(
          <Button variant="secondary" key={index} value = {item} onClick={(e)=>setTextArea(e.currentTarget?.value)} className='w-full m-4'>
          {item}
        </Button>
        ))
      }
      </div>
    </div>
    <div className='w-full flex justify-center flex-col items-center p-6'>
       <h3>Get your message Board</h3>
       <Link href='/dashboard'>
       <Button className='m-4 p-2 font-semibold'>Visit Dashboard</Button>
       </Link>
    </div>
    </div>
  )
}

export default page;