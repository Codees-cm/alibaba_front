"use client"
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Filter,
  Eye,
  Reply,
  Flag,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'hidden';
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: 'PROD-001',
    productName: 'Wireless Headphones',
    customerName: 'John Doe',
    rating: 5,
    title: 'Excellent sound quality!',
    comment: 'These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing. Highly recommended!',
    date: '2024-08-05',
    status: 'published',
    helpful: 12,
    notHelpful: 1,
    verified: true
  },
  {
    id: '2',
    productId: 'PROD-002',
    productName: 'Smart Watch',
    customerName: 'Jane Smith',
    rating: 4,
    title: 'Good value for money',
    comment: 'The watch works well and has many useful features. The only downside is the battery life could be better.',
    date: '2024-08-04',
    status: 'published',
    helpful: 8,
    notHelpful: 2,
    verified: true
  },
  {
    id: '3',
    productId: 'PROD-003',
    productName: 'Laptop Stand',
    customerName: 'Mike Johnson',
    rating: 2,
    title: 'Not as sturdy as expected',
    comment: 'The stand feels flimsy and wobbles when typing. Not worth the price.',
    date: '2024-08-03',
    status: 'pending',
    helpful: 3,
    notHelpful: 8,
    verified: false
  },
  {
    id: '4',
    productId: 'PROD-004',
    productName: 'Bluetooth Speaker',
    customerName: 'Sarah Wilson',
    rating: 5,
    title: 'Amazing sound!',
    comment: 'Perfect for outdoor activities. The sound is clear and loud, and it\'s very portable.',
    date: '2024-08-02',
    status: 'published',
    helpful: 15,
    notHelpful: 0,
    verified: true
  }
];

export default function ReviewsPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = useTranslation(locale, 'common');
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'hidden': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const publishedReviews = reviews.filter(r => r.status === 'published').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and ratings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
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
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
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
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{publishedReviews}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReviews}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ThumbsDown className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="hidden">Hidden</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{review.title}</h3>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    {review.verified && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>By {review.customerName}</span>
                    <span>•</span>
                    <span>{review.productName}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} helpful</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{review.notHelpful} not helpful</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(review.status)}>
                    {review.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      {review.status === 'pending' && (
                        <DropdownMenuItem>
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {review.status === 'published' && (
                        <DropdownMenuItem>
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Hide
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="w-4 h-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
