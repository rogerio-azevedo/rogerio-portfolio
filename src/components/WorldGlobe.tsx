'use client'

import dynamic from 'next/dynamic'

const World = dynamic(() => import('./ui/Globe').then(m => m.World), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 w-full items-center justify-center md:h-[700px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent"></div>
    </div>
  ),
})

export function WorldGlobe() {
  const globeConfig = {
    pointSize: 3,
    globeColor: '#1e293b',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.12,
    emissive: '#065f46',
    emissiveIntensity: 0.15,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.7)',
    ambientLight: '#34d399',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 2000,
    arcLength: 0.8,
    rings: 1,
    maxRings: 2,
    initialPosition: { lat: -14.235, lng: -51.925 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }

  // Arcos expandidos conectando todos os continentes
  const globalArcs = [
    // Conexões do Brasil (hub principal)
    {
      order: 1,
      startLat: -14.235, // Brazil
      startLng: -51.925,
      endLat: 40.7128, // New York, USA
      endLng: -74.006,
      arcAlt: 0.3,
      color: '#34d399',
    },
    {
      order: 2,
      startLat: -14.235, // Brazil
      startLng: -51.925,
      endLat: 51.5072, // London, UK
      endLng: -0.1276,
      arcAlt: 0.4,
      color: '#22c55e',
    },
    {
      order: 3,
      startLat: -14.235, // Brazil
      startLng: -51.925,
      endLat: 35.6762, // Tokyo, Japan
      endLng: 139.6503,
      arcAlt: 0.5,
      color: '#16a34a',
    },
    // Conexões América do Sul
    {
      order: 4,
      startLat: -34.6118, // Argentina (Buenos Aires)
      startLng: -58.396,
      endLat: 35.6762, // Tokyo, Japan
      endLng: 139.6503,
      arcAlt: 0.15,
      color: '#15803d',
    },
    {
      order: 5,
      startLat: -12.0464, // Peru (Lima)
      startLng: -77.0428,
      endLat: 4.711, // Colombia (Bogotá)
      endLng: -74.0721,
      arcAlt: 0.2,
      color: '#34d399',
    },
    // Conexões América do Norte
    {
      order: 6,
      startLat: 40.7128, // New York, USA
      startLng: -74.006,
      endLat: 45.4215, // Montreal, Canada
      endLng: -75.6972,
      arcAlt: 0.2,
      color: '#22c55e',
    },
    {
      order: 7,
      startLat: 19.4326, // Mexico City
      startLng: -99.1332,
      endLat: 23.1136, // Havana, Cuba
      endLng: -82.3666,
      arcAlt: 0.25,
      color: '#16a34a',
    },
    // Conexões Europa
    {
      order: 8,
      startLat: 51.5072, // London, UK
      startLng: -0.1276,
      endLat: 48.8566, // Paris, France
      endLng: 2.3522,
      arcAlt: 0.1,
      color: '#15803d',
    },
    {
      order: 9,
      startLat: 48.8566, // Paris, France
      startLng: 2.3522,
      endLat: 52.52, // Berlin, Germany
      endLng: 13.405,
      arcAlt: 0.15,
      color: '#34d399',
    },
    {
      order: 10,
      startLat: 40.4168, // Madrid, Spain
      startLng: -3.7038,
      endLat: 41.9028, // Rome, Italy
      endLng: 12.4964,
      arcAlt: 0.2,
      color: '#22c55e',
    },
    // Conexões África
    {
      order: 11,
      startLat: -26.2041, // South Africa (Johannesburg)
      startLng: 28.0473,
      endLat: -1.2921, // Kenya (Nairobi)
      endLng: 36.8219,
      arcAlt: 0.3,
      color: '#16a34a',
    },
    {
      order: 12,
      startLat: 30.0444, // Egypt (Cairo)
      startLng: 31.2357,
      endLat: 33.9716, // Morocco (Rabat)
      endLng: -6.8498,
      arcAlt: 0.25,
      color: '#15803d',
    },
    {
      order: 13,
      startLat: 9.0579, // Nigeria (Abuja)
      startLng: 7.4951,
      endLat: -26.2041, // South Africa (Johannesburg)
      endLng: 28.0473,
      arcAlt: 0.4,
      color: '#34d399',
    },
    // Conexões Oceania
    {
      order: 14,
      startLat: -25.2744, // Australia (Alice Springs)
      startLng: 133.7751,
      endLat: -41.2865, // New Zealand (Wellington)
      endLng: 174.7762,
      arcAlt: 0.2,
      color: '#22c55e',
    },
    {
      order: 15,
      startLat: -6.314993, // Papua New Guinea (Port Moresby)
      startLng: 143.95555,
      endLat: -25.2744, // Australia (Alice Springs)
      endLng: 133.7751,
      arcAlt: 0.25,
      color: '#16a34a',
    },
    {
      order: 16,
      startLat: -18.1248, // Fiji (Suva)
      startLng: 178.4501,
      endLat: -41.2865, // New Zealand (Wellington)
      endLng: 174.7762,
      arcAlt: 0.15,
      color: '#15803d',
    },
    // Conexões intercontinentais importantes
    {
      order: 17,
      startLat: 51.5072, // London, UK
      startLng: -0.1276,
      endLat: -26.2041, // South Africa (Johannesburg)
      endLng: 28.0473,
      arcAlt: 0.6,
      color: '#34d399',
    },
    {
      order: 18,
      startLat: 35.6762, // Tokyo, Japan
      startLng: 139.6503,
      endLat: -25.2744, // Australia (Alice Springs)
      endLng: 133.7751,
      arcAlt: 0.4,
      color: '#22c55e',
    },
  ]

  return (
    <div className="absolute top-32 flex h-full w-full items-center justify-center overflow-hidden md:top-30">
      <div className="relative mx-auto h-96 w-full max-w-7xl md:h-[700px]">
        <div className="absolute z-10 mt-40 h-96 w-full md:h-full">
          <World data={globalArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  )
}
