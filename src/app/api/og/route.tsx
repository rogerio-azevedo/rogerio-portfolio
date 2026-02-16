import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'en'

  const metadata = {
    pt: {
      title: 'Rogério Azevedo',
      subtitle: 'Engenheiro de Software Sênior',
      description: 'Especialista em sistemas escaláveis e soluções modernas',
    },
    en: {
      title: 'Rogério Azevedo',
      subtitle: 'Senior Software Engineer',
      description: 'Expert in scalable systems and modern solutions',
    },
    es: {
      title: 'Rogério Azevedo',
      subtitle: 'Ingeniero de Software Senior',
      description: 'Experto en sistemas escalables y soluciones modernas',
    },
  }

  const currentMetadata = metadata[lang as keyof typeof metadata] || metadata.en

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          fontSize: 32,
          fontWeight: 600,
        }}>
        {/* Header com gradiente */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
            {currentMetadata.title}
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#e2e8f0',
            marginBottom: 20,
            textAlign: 'center',
          }}>
          {currentMetadata.subtitle}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}>
          {currentMetadata.description}
        </div>

        {/* Tech Stack Icons (simulados) */}
        <div
          style={{
            display: 'flex',
            gap: 30,
            marginTop: 50,
            alignItems: 'center',
          }}>
          {['React', 'TypeScript', 'Node.js', 'AWS'].map(tech => (
            <div
              key={tech}
              style={{
                padding: '12px 24px',
                backgroundColor: '#1e293b',
                border: '2px solid #334155',
                borderRadius: 12,
                color: '#10b981',
                fontSize: 18,
                fontWeight: 600,
              }}>
              {tech}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 20,
            color: '#64748b',
          }}>
          azevedo.dev.br
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
