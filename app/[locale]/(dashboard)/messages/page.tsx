"use client"
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Send, 
  Paperclip,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Phone,
  Video
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'high' | 'medium' | 'low';
  type: 'customer_support' | 'order_inquiry' | 'complaint' | 'general';
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'customer-1',
    senderName: 'John Doe',
    subject: 'Order Delivery Issue',
    preview: 'Hi, I have not received my order yet and it was supposed to arrive yesterday...',
    content: 'Hi, I have not received my order yet and it was supposed to arrive yesterday. The tracking shows it was delivered but I never received it. Can you please help me track down my package? Order number: ORD-12345',
    timestamp: '2024-08-06T10:30:00Z',
    isRead: false,
    isStarred: true,
    priority: 'high',
    type: 'order_inquiry'
  },
  {
    id: '2',
    senderId: 'customer-2',
    senderName: 'Jane Smith',
    subject: 'Product Return Request',
    preview: 'I would like to return the wireless headphones I purchased last week...',
    content: 'I would like to return the wireless headphones I purchased last week. They are not working properly and the sound quality is poor. Please let me know the return process.',
    timestamp: '2024-08-06T09:15:00Z',
    isRead: true,
    isStarred: false,
    priority: 'medium',
    type: 'complaint'
  },
  {
    id: '3',
    senderId: 'customer-3',
    senderName: 'Mike Johnson',
    subject: 'Account Access Problem',
    preview: 'I am unable to log into my account. It says my password is incorrect...',
    content: 'I am unable to log into my account. It says my password is incorrect but I am sure I am using the right password. Can you help me reset it?',
    timestamp: '2024-08-06T08:45:00Z',
    isRead: true,
    isStarred: false,
    priority: 'medium',
    type: 'customer_support'
  },
  {
    id: '4',
    senderId: 'customer-4',
    senderName: 'Sarah Wilson',
    subject: 'Thank you for excellent service!',
    preview: 'I wanted to thank you for the excellent customer service...',
    content: 'I wanted to thank you for the excellent customer service. My recent order was processed quickly and arrived in perfect condition. Keep up the great work!',
    timestamp: '2024-08-05T16:20:00Z',
    isRead: true,
    isStarred: true,
    priority: 'low',
    type: 'general'
  }
];

export default function MessagesPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation(locale, 'common');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [replyText, setReplyText] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || message.type === filterType;
    return matchesSearch && matchesType;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer_support': return 'bg-blue-100 text-blue-800';
      case 'order_inquiry': return 'bg-purple-100 text-purple-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const toggleStar = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred).length;
  const highPriorityCount = messages.filter(m => m.priority === 'high').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Manage customer communications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Starred</p>
                <p className="text-2xl font-bold text-yellow-600">{starredCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle>Inbox</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="order_inquiry">Order Inquiry</option>
                  <option value="complaint">Complaint</option>
                  <option value="general">General</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    } ${!message.isRead ? 'bg-blue-50/30' : ''}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.isRead) {
                        markAsRead(message.id);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!message.isRead ? 'font-bold' : ''}`}>
                          {message.senderName}
                        </h4>
                        {message.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <h5 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold' : ''}`}>
                      {message.subject}
                    </h5>
                    <p className="text-xs text-gray-600 truncate mb-2">
                      {message.preview}
                    </p>
                    <div className="flex gap-2">
                      <Badge className={`${getPriorityColor(message.priority)} text-xs`}>
                        {message.priority}
                      </Badge>
                      <Badge className={`${getTypeColor(message.type)} text-xs`}>
                        {message.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>From: {selectedMessage.senderName}</span>
                      <span>{formatTime(selectedMessage.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(selectedMessage.id)}
                    >
                      <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'text-yellow-400 fill-current' : ''}`} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Reply className="w-4 h-4 mr-2" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Forward className="w-4 h-4 mr-2" />
                          Forward
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <Badge className={getPriorityColor(selectedMessage.priority)}>
                      {selectedMessage.priority} priority
                    </Badge>
                    <Badge className={getTypeColor(selectedMessage.type)}>
                      {selectedMessage.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Reply</h4>
                  <div className="space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No message selected</h3>
                <p className="text-gray-600">Select a message from the list to view its content</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
