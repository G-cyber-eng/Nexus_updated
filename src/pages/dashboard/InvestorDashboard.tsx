
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

// Components
import Calendar from '../../components/ui/Calendar';
import VideoCall from '../../components/video/VideoCall';
import DocumentChamber from '../../components/document/DocumentChamber';
import PaymentChamber from '../../components/payment/PaymentChamber';

// Define CollaborationRequest type
type CollaborationRequest = {
  entrepreneurId: string;
  meetingDate: string;
  startupName: string;
  status: string;
};

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  // Safe way to get collaboration requests
  const rawRequests = getRequestsFromInvestor(user.id);
  const sentRequests: CollaborationRequest[] = Array.isArray(rawRequests)
    ? (rawRequests as unknown as CollaborationRequest[])
    : [];

  // Filter entrepreneurs based on search & industry
  const filteredEntrepreneurs = entrepreneurs.filter((ent) => {
    const matchesSearch =
      searchQuery === '' ||
      ent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 || selectedIndustries.includes(ent.industry);

    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(entrepreneurs.map((e) => e.industry)));

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>
            View All Startups
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer select-none"
                >
                  <div
                    onClick={() => toggleIndustry(industry)}
                    className="px-3 py-1 w-full h-full"
                  >
                    {industry}
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full mr-4">
              <Users size={20} className="text-primary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-700">Total Startups</p>
              <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-full mr-4">
              <PieChart size={20} className="text-secondary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-700">Industries</p>
              <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-accent-100 rounded-full mr-4">
              <Users size={20} className="text-accent-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-accent-700">Your Connections</p>
              <h3 className="text-xl font-semibold text-accent-900">
                {sentRequests.filter((req) => req.status === 'accepted').length}
              </h3>
            </div>
          </CardBody>
        </Card>
      </div>

            {/* Calendar + VideoCall - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          {/* <Calendar
            meetings={sentRequests
              .filter((req) => req.status === 'accepted')
              .map((req) => ({
                meetingDate: req.meetingDate,
                startupName: req.startupName,
              }))}
          /> */}
          <Calendar role="investor" />
        </div>

        <div className="h-full">
          <VideoCall />
        </div>
      </div>

      {/* DocumentChamber + PaymentChamber - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          <DocumentChamber />
        </div>
        <div className="h-full">
          <PaymentChamber />
        </div>
      </div>

      {/* Entrepreneurs Grid */}
      <div>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>
          </CardHeader>
          <CardBody>
            {filteredEntrepreneurs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntrepreneurs.map((ent) => (
                  <EntrepreneurCard key={ent.id} entrepreneur={ent} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No startups match your filters</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustries([]);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};