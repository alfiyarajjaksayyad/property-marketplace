import { Shield, MessageCircle, Search, Users, Home, Star } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find properties with advanced filters including location, price, amenities, and more.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Chat directly with property owners without any intermediaries or hidden fees.',
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are verified to ensure authenticity and prevent fraudulent listings.',
  },
  {
    icon: Users,
    title: 'Trusted Community',
    description: 'Join thousands of satisfied users who have found their perfect homes through our platform.',
  },
  {
    icon: Home,
    title: 'Multiple Property Types',
    description: 'From apartments to luxury homes, find any type of property that suits your needs.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Enjoy a seamless, user-friendly experience with our modern and intuitive platform.',
  },
]

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PropertyHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best platform for property seekers and owners to connect seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}