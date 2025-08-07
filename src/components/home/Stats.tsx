import { TrendingUp, Users, Home, MapPin } from 'lucide-react'

const stats = [
  {
    icon: Home,
    value: '10,000+',
    label: 'Properties Listed',
    description: 'Active listings across all categories',
  },
  {
    icon: Users,
    value: '50,000+',
    label: 'Happy Users',
    description: 'Satisfied property seekers and owners',
  },
  {
    icon: MapPin,
    value: '100+',
    label: 'Cities',
    description: 'Coverage across major metropolitan areas',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    description: 'Properties successfully rented or sold',
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}