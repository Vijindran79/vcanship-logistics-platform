import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Package, 
  Ship, 
  Plane, 
  Container, 
  Globe, 
  Star, 
  Bell, 
  User, 
  Sun, 
  Moon,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  Building,
  Settings,
  ChevronDown,
  Menu,
  X,
  Shield,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react'
import { countries } from './data/countries.js'
import { languages } from './data/languages.js'
import { translations } from './data/translations.js'
import QuoteModal from './components/QuoteModal.jsx'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('GB')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [currentEmotionalMessage, setCurrentEmotionalMessage] = useState(0)
  const [currentSeoMessage, setCurrentSeoMessage] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const currentTranslations = translations[selectedLanguage] || translations.en
  const currentCountryData = countries.find(c => c.code === selectedCountry) || countries.find(c => c.code === 'GB')

  // Rotate emotional messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotionalMessage(prev => 
        (prev + 1) % (currentTranslations.emotionalMessages?.length || 4)
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [currentTranslations.emotionalMessages])

  // Rotate SEO messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeoMessage(prev => 
        (prev + 1) % (currentTranslations.seoMessages?.length || 4)
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [currentTranslations.seoMessages])

  // Update language when country changes
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode)
    const country = countries.find(c => c.code === countryCode)
    if (country && country.language !== selectedLanguage) {
      setSelectedLanguage(country.language)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Group countries by region for better UX
  const groupedCountries = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = []
    }
    acc[country.region].push(country)
    return acc
  }, {})

  const services = [
    {
      icon: Package,
      title: currentTranslations.expressParcel,
      description: currentTranslations.fastAffordable,
      details: currentTranslations.sameDayDelivery,
      price: "$12.99",
      color: "bg-blue-500",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Ship,
      title: currentTranslations.fclShipping,
      description: currentTranslations.fullContainer,
      details: currentTranslations.globalPortNetwork,
      price: "$2,500",
      color: "bg-green-500",
      borderColor: "border-green-200",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Plane,
      title: currentTranslations.airFreight,
      description: currentTranslations.expressAir,
      details: currentTranslations.hourDelivery,
      price: "$89",
      color: "bg-purple-500",
      borderColor: "border-purple-200",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Container,
      title: currentTranslations.lclShipping,
      description: currentTranslations.lessThanContainer,
      details: currentTranslations.costEffective,
      price: "$450",
      color: "bg-cyan-500",
      borderColor: "border-cyan-200",
      gradient: "from-cyan-500 to-cyan-600"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure & Insured",
      description: "Full insurance coverage and secure handling"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Express delivery options worldwide"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in logistics"
    },
    {
      icon: TrendingUp,
      title: "Real-time Tracking",
      description: "Monitor your shipments 24/7"
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Navigation */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      VCanship
                    </h1>
                    <p className="text-xs text-muted-foreground">Worldwide Logistics Platform</p>
                  </div>
                </div>
                
                <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-100">
                  <Globe className="w-3 h-3 mr-1" />
                  Global
                </Badge>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Building className="w-4 h-4 mr-2" />
                    {currentTranslations.services}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-green-50 dark:hover:bg-green-950">
                    <Truck className="w-4 h-4 mr-2" />
                    {currentTranslations.tradeLanes}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-purple-50 dark:hover:bg-purple-950">
                    <Settings className="w-4 h-4 mr-2" />
                    {currentTranslations.developerHub}
                  </Button>
                </nav>

                {/* Mobile Menu Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>

              {/* Right side controls */}
              <div className="flex items-center space-x-4">
                {/* Country/Language Selector */}
                <div className="hidden md:flex items-center space-x-2">
                  <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-32 border-2 hover:border-blue-300 transition-colors">
                      <SelectValue>
                        <div className="flex items-center space-x-2">
                          <span>{currentCountryData.flag}</span>
                          <span className="text-sm font-medium">{currentCountryData.currency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {Object.entries(groupedCountries).map(([region, regionCountries]) => (
                        <div key={region}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
                            {region}
                          </div>
                          {regionCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center space-x-2">
                                <span>{country.flag}</span>
                                <span className="truncate">{country.name}</span>
                                <span className="text-muted-foreground text-xs">({country.currency})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-24 border-2 hover:border-purple-300 transition-colors">
                      <SelectValue>
                        <span className="text-sm font-medium">{selectedLanguage.toUpperCase()}</span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex flex-col">
                            <span className="font-medium">{lang.nativeName}</span>
                            <span className="text-xs text-muted-foreground">{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location and Rating */}
                <div className="hidden xl:flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>Gosport, United Kingdom</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">4.9★</span>
                  </div>
                </div>

                {/* Action buttons */}
                <Button variant="outline" size="sm" className="hidden md:flex hover:bg-blue-50 dark:hover:bg-blue-950">
                  <Bell className="w-4 h-4 mr-2" />
                  {currentTranslations.trackShipment}
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleDarkMode}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                <Button size="sm" className="hidden md:flex hover:bg-blue-700">
                  <User className="w-4 h-4 mr-2" />
                  {currentTranslations.signIn}
                </Button>

                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  {currentTranslations.shipNow}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-border">
                <nav className="flex flex-col space-y-2 mt-4">
                  <Button variant="ghost" className="justify-start">
                    <Building className="w-4 h-4 mr-2" />
                    {currentTranslations.services}
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Truck className="w-4 h-4 mr-2" />
                    {currentTranslations.tradeLanes}
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    {currentTranslations.developerHub}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    {currentTranslations.trackShipment}
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    {currentTranslations.signIn}
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              {currentTranslations.shipAnything}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {currentTranslations.subtitle}
            </p>

            {/* Rotating SEO Messages */}
            <div className="mb-8">
              <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse transition-all duration-500">
                {currentTranslations.seoMessages?.[currentSeoMessage] || "Global shipping made simple and affordable"}
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Track your shipment..." 
                  className="pl-10 border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button 
                    size="sm" 
                    className="absolute right-1 top-1 h-8"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
                  <feature.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className={`border-3 ${service.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-105 group shadow-lg hover:shadow-2xl rounded-xl`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{service.details}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">{currentTranslations.from}</span>
                    <span className="font-bold text-lg text-green-600">{service.price}</span>
                  </div>
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors border-2 border-gray-700 hover:border-gray-600"
                    onClick={() => {
                      setSelectedService(service)
                      setIsQuoteModalOpen(true)
                    }}
                  >
                    {currentTranslations.getQuote}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Dashboard and Special Offers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Live Shipping Dashboard */}
            <Card className="lg:col-span-2 border-3 border-blue-200 hover:shadow-xl transition-shadow shadow-lg rounded-xl">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>{currentTranslations.liveShippingDashboard}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border-2 border-blue-200 hover:shadow-md transition-shadow">
                    <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-sm text-muted-foreground">{currentTranslations.activeShipments}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border-2 border-green-200 hover:shadow-md transition-shadow">
                    <Truck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">{currentTranslations.inTransit}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg border-2 border-purple-200 hover:shadow-md transition-shadow">
                    <DollarSign className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">$2.4M</p>
                    <p className="text-sm text-muted-foreground">{currentTranslations.monthlyVolume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-3 border-purple-300 hover:shadow-xl transition-shadow shadow-lg rounded-xl">
              <CardHeader className="border-b border-purple-100">
                <CardTitle className="text-center">{currentTranslations.specialOffers}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg shadow-lg border-2 border-purple-400">
                  <h3 className="text-xl font-bold mb-2">50% OFF</h3>
                  <p className="text-sm mb-4">{currentTranslations.firstTimeExpress}</p>
                  <Button variant="secondary" size="sm" className="hover:bg-white/90 border-2 border-white/20">
                    {currentTranslations.claimOffer}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emotional Touch Section */}
          <div className="text-center py-8 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-950 dark:via-purple-950 dark:to-green-950 rounded-xl border-3 border-blue-200 shadow-lg">
            <p className="text-lg italic text-muted-foreground transition-all duration-500 animate-pulse">
              {currentTranslations.emotionalMessages?.[currentEmotionalMessage] || "Your loved ones are far away, but we'll deliver their gifts."}
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">© 2024 VCanship - Worldwide Logistics Platform</p>
              <p className="text-sm">Connecting businesses across {countries.length}+ countries with {languages.length}+ languages</p>
            </div>
          </div>
        </footer>

        {/* Quote Modal */}
        <QuoteModal 
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          service={selectedService}
          translations={currentTranslations}
          countries={countries}
        />
      </div>
    </div>
  )
}

export default App

