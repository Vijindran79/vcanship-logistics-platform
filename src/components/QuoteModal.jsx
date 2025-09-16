import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { X, Package, MapPin, Calendar, Weight } from 'lucide-react'

const QuoteModal = ({ isOpen, onClose, service, translations, countries }) => {
  const [formData, setFormData] = useState({
    fromCountry: '',
    toCountry: '',
    weight: '',
    dimensions: '',
    shipDate: '',
    email: '',
    phone: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would send the quote request
    alert(`Quote request submitted for ${service.title}!\n\nWe'll contact you within 24 hours with a detailed quote.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}`)
    onClose()
    setFormData({
      fromCountry: '',
      toCountry: '',
      weight: '',
      dimensions: '',
      shipDate: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <service.icon className="w-6 h-6 text-blue-600" />
              <span>Get Quote - {service.title}</span>
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll send you a detailed quote within 24 hours
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  From Country
                </label>
                <Select value={formData.fromCountry} onValueChange={(value) => setFormData({...formData, fromCountry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select origin country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.slice(0, 20).map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  To Country
                </label>
                <Select value={formData.toCountry} onValueChange={(value) => setFormData({...formData, toCountry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.slice(0, 20).map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Weight className="w-4 h-4 inline mr-1" />
                  Weight (kg)
                </label>
                <Input 
                  type="number" 
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Package className="w-4 h-4 inline mr-1" />
                  Dimensions (L×W×H cm)
                </label>
                <Input 
                  placeholder="e.g., 50×40×30"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Ship Date
              </label>
              <Input 
                type="date" 
                value={formData.shipDate}
                onChange={(e) => setFormData({...formData, shipDate: e.target.value})}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Service-specific information */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">{service.title} - Service Details</h4>
              <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
              <p className="text-sm text-muted-foreground">{service.details}</p>
              <p className="text-sm font-medium text-green-600 mt-2">Starting from {service.price}</p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Request Quote
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuoteModal

