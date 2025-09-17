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
  TrendingUp,
  Warehouse,
  FileText,
  Umbrella,
  Eye,
  Box,
  Send,
  Weight,
  AlertTriangle,
  Thermometer,
  Wrench,
  Briefcase,
  ShoppingCart,
  Home,
  Network
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

  // Auto-detect user's language and country on first load
  useEffect(() => {
    const detectUserLanguage = () => {
      try {
        const browserLang = navigator.language || navigator.userLanguage
        const langCode = browserLang.split('-')[0] // Get primary language code
        
        // Map browser language to our supported languages
        const languageMap = {
          'en': 'en',
          'es': 'es', 
          'fr': 'fr',
          'de': 'de',
          'it': 'it',
          'pt': 'pt',
          'ru': 'ru',
          'ja': 'ja',
          'ko': 'ko',
          'zh': 'zh',
          'ar': 'ar',
          'hi': 'hi'
        }
        
        const detectedLang = languageMap[langCode] || 'en'
        
        // Find country that matches the detected language
        const matchingCountry = countries.find(country => country.language === detectedLang)
        
        if (matchingCountry) {
          setSelectedCountry(matchingCountry.code)
          setSelectedLanguage(detectedLang)
        } else {
          // Default fallback
          setSelectedCountry('GB')
          setSelectedLanguage('en')
        }
      } catch {
        // Fallback to English/UK if detection fails
        setSelectedCountry('GB')
        setSelectedLanguage('en')
      }
    }
    
    detectUserLanguage()
  }, [])

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

  const mainServices = [
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

  const additionalServices = [
    {
      icon: Truck,
      title: currentTranslations.roadFreight,
      description: currentTranslations.roadTransport,
      details: "Door-to-door road transportation",
      price: "$25",
      color: "bg-orange-500",
      borderColor: "border-orange-200",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Building,
      title: currentTranslations.railFreight,
      description: currentTranslations.railTransport,
      details: "Cost-effective rail solutions",
      price: "$180",
      color: "bg-gray-500",
      borderColor: "border-gray-200",
      gradient: "from-gray-500 to-gray-600"
    },
    {
      icon: Warehouse,
      title: currentTranslations.warehousing,
      description: currentTranslations.warehouseSolutions,
      details: "Secure storage and distribution",
      price: "$15/month",
      color: "bg-indigo-500",
      borderColor: "border-indigo-200",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: FileText,
      title: currentTranslations.customsClearance,
      description: currentTranslations.customsExpertise,
      details: "Expert customs documentation",
      price: "$85",
      color: "bg-teal-500",
      borderColor: "border-teal-200",
      gradient: "from-teal-500 to-teal-600"
    },
    {
      icon: Umbrella,
      title: currentTranslations.cargoInsurance,
      description: currentTranslations.insuranceCoverage,
      details: "Complete cargo protection",
      price: "0.5%",
      color: "bg-red-500",
      borderColor: "border-red-200",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Eye,
      title: currentTranslations.realTimeTracking,
      description: currentTranslations.trackingTechnology,
      details: "24/7 shipment monitoring",
      price: "Free",
      color: "bg-lime-500",
      borderColor: "border-lime-200",
      gradient: "from-lime-500 to-lime-600"
    },
    {
      icon: Box,
      title: currentTranslations.packagingServices,
      description: currentTranslations.packagingExpertise,
      details: "Professional packing solutions",
      price: "$35",
      color: "bg-pink-500",
      borderColor: "border-pink-200",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: Send,
      title: currentTranslations.courierServices,
      description: currentTranslations.courierDelivery,
      details: "Same-day local delivery",
      price: "$8.99",
      color: "bg-violet-500",
      borderColor: "border-violet-200",
      gradient: "from-violet-500 to-violet-600"
    },
    {
      icon: Weight,
      title: currentTranslations.bulkShipping,
      description: currentTranslations.bulkTransport,
      details: "Large volume shipping",
      price: "Quote",
      color: "bg-amber-500",
      borderColor: "border-amber-200",
      gradient: "from-amber-500 to-amber-600"
    },
    {
      icon: AlertTriangle,
      title: currentTranslations.hazardousMaterials,
      description: currentTranslations.hazardousHandling,
      details: "Specialized hazardous transport",
      price: "Quote",
      color: "bg-yellow-500",
      borderColor: "border-yellow-200",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Thermometer,
      title: currentTranslations.temperatureControlled,
      description: currentTranslations.temperatureShipping,
      details: "Climate-controlled logistics",
      price: "$125",
      color: "bg-sky-500",
      borderColor: "border-sky-200",
      gradient: "from-sky-500 to-sky-600"
    },
    {
      icon: Wrench,
      title: currentTranslations.projectCargo,
      description: currentTranslations.projectLogistics,
      details: "Heavy lift and project shipping",
      price: "Quote",
      color: "bg-slate-500",
      borderColor: "border-slate-200",
      gradient: "from-slate-500 to-slate-600"
    },
    {
      icon: Briefcase,
      title: currentTranslations.exhibitionShipping,
      description: currentTranslations.exhibitionLogistics,
      details: "Event and exhibition logistics",
      price: "$95",
      color: "bg-emerald-500",
      borderColor: "border-emerald-200",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Home,
      title: currentTranslations.personalEffects,
      description: currentTranslations.personalShipping,
      details: "Household goods transport",
      price: "$75",
      color: "bg-rose-500",
      borderColor: "border-rose-200",
      gradient: "from-rose-500 to-rose-600"
    },
    {
      icon: ShoppingCart,
      title: currentTranslations.ecommerceShipping,
      description: currentTranslations.onlineFulfillment,
      details: "E-commerce order processing",
      price: "$4.99",
      color: "bg-fuchsia-500",
      borderColor: "border-fuchsia-200",
      gradient: "from-fuchsia-500 to-fuchsia-600"
    },
    {
      icon: MapPin,
      title: currentTranslations.lastMileDelivery,
      description: currentTranslations.localDelivery,
      details: "Final delivery to customer",
      price: "$6.99",
      color: "bg-cyan-600",
      borderColor: "border-cyan-300",
      gradient: "from-cyan-600 to-cyan-700"
    },
    {
      icon: Network,
      title: currentTranslations.supplyChainSolutions,
      description: currentTranslations.chainManagement,
      details: "Complete supply chain optimization",
      price: "Custom",
      color: "bg-stone-500",
      borderColor: "border-stone-200",
      gradient: "from-stone-500 to-stone-600"
    },
    {
      icon: DollarSign,
      title: currentTranslations.tradeFinance,
      description: currentTranslations.tradeFinanceServices,
      details: "LC, bank guarantees, and financial instruments",
      price: "Consult",
      color: "bg-emerald-600",
      borderColor: "border-emerald-300",
      gradient: "from-emerald-600 to-emerald-700"
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      role: "Supply Chain Manager",
      content: "VCanship has revolutionized our international shipping. Their real-time tracking and competitive rates have saved us thousands.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Miguel Rodriguez",
      company: "Global Imports Ltd.",
      role: "Operations Director",
      content: "Exceptional service for our container shipments. Professional team, reliable delivery, and great customer support.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Chen",
      company: "Fashion Forward",
      role: "E-commerce Manager",
      content: "Fast, secure, and affordable. Our customers love the express delivery options. Highly recommended!",
      rating: 5,
      avatar: "EC"
    }
  ]

  const stats = [
    { number: "200+", label: "Countries Served", icon: Globe },
    { number: "10M+", label: "Packages Delivered", icon: Package },
    { number: "99.8%", label: "On-Time Delivery", icon: Clock },
    { number: "24/7", label: "Customer Support", icon: Bell }
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
                    <Search className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-green-50 dark:hover:bg-green-950">
                    <Building className="w-4 h-4 mr-2" />
                    Services
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-purple-50 dark:hover:bg-purple-950">
                    <Settings className="w-4 h-4 mr-2" />
                    API Hub
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-orange-50 dark:hover:bg-orange-950">
                    <Bell className="w-4 h-4 mr-2" />
                    Help Center
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
                    <Search className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Building className="w-4 h-4 mr-2" />
                    Services
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    API Hub
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Login / Sign Up
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-fade-in-up">
              {currentTranslations.shipAnything}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-100">
              {currentTranslations.subtitle}
            </p>

            {/* Rotating SEO Messages */}
            <div className="mb-8 animate-fade-in-up animate-delay-200">
              <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse transition-all duration-500">
                {currentTranslations.seoMessages?.[currentSeoMessage] || "Global shipping made simple and affordable"}
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-md mx-auto mb-8 animate-fade-in-up animate-delay-300">
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

            {/* Big Send a Parcel Card */}
            <div className="mb-12 animate-fade-in-up animate-delay-400">
              <Card className="border-2 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Send a Parcel</CardTitle>
                  <CardDescription className="text-lg">Fast, affordable international delivery</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">Book Now</Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <CardHeader>
                  <Plane className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Air Freight</CardTitle>
                  <CardDescription>Book Air Freight</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  PARCEL
                </div>
                <CardHeader>
                  <Ship className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>FCL Shipping</CardTitle>
                  <CardDescription>Book FCL</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  PARCEL
                </div>
                <CardHeader>
                  <Container className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>LCL Shipping</CardTitle>
                  <CardDescription>Book LCL</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Book Now</Button>
                </CardContent>
              </Card>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-card border hover:shadow-md transition-shadow animate-fade-in-up" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                  <feature.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mainServices.map((service, index) => (
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

          {/* E-commerce Solutions Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">E-commerce Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Integrated fulfillment, warehousing, and last-mile delivery. Launch your global store and reach customers worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2 hover:shadow-xl transition-shadow shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                    <span>Launch Your Global Store</span>
                  </CardTitle>
                  <CardDescription>
                    Advertise your products on our platform and automatically cross-post to multiple e-commerce sites under our account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">One-click multi-platform advertising</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Global shipping handled by us</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time inventory sync</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">24/7 customer support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-6 h-6 text-green-600" />
                    <span>Fulfillment Services</span>
                  </CardTitle>
                  <CardDescription>
                    Complete order processing, warehousing, and worldwide delivery solutions for your e-commerce business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Automated order processing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Secure warehousing facilities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Last-mile delivery worldwide</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time tracking & updates</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-2 hover:bg-green-50 dark:hover:bg-green-950">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Become a Partner Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
                Join our global network of trusted carriers and expand your business opportunities worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Global Network</h3>
                  <p className="text-sm opacity-90">Access to 200+ countries and growing</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Revenue Growth</h3>
                  <p className="text-sm opacity-90">Increase your business opportunities</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Trusted Platform</h3>
                  <p className="text-sm opacity-90">Join a network of verified partners</p>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
                Register Now
              </Button>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust VCanship for their logistics needs worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">VCanship</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Your trusted global logistics partner, connecting businesses worldwide with reliable, fast, and cost-effective shipping solutions.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Newsletter
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Support
                  </Button>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Express Parcel</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Air Freight</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Sea Freight</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Warehousing</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Customs Clearance</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-border pt-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Headquarters</div>
                    <div className="text-sm text-muted-foreground">Gosport, United Kingdom</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">24/7 Support</div>
                    <div className="text-sm text-muted-foreground">support@vcanresources.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">+1 (251) 316-6847</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2024 Vcanship by Vcan Resources. All Rights Reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition-colors">Inspector Portal</a>
              </div>
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

