import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Clients } from './collections/Clients'
import { ContactInfo } from './collections/ContactInfo'
import { Faqs } from './collections/Faqs'
import { GroupCompanies } from './collections/GroupCompanies'
import { Highlights } from './collections/Highlights'
import { Inquiries } from './collections/Inquiries'
import { Leadership } from './collections/Leadership'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { MediaSection } from './collections/MediaSection'
import { Stats } from './collections/Stats'
import { Users } from './collections/Users'
import { YTlinks } from './collections/Ytlinks'
import { ClientsServed } from './collections/ClientsServed'
import { SuccessfulProjects } from './collections/SuccessfulProjects'
import { PrestigiousAwards } from './collections/PrestigiousAwards'
import { YearsOfExperience } from './collections/YearsOfExperience'
import { ClientMarquee } from './collections/ClientMarquee'
import { Services } from './collections/Services'
import { OngoingProjects } from './collections/OngoingProjects'
import { UpcomingProjects } from './collections/UpcomingProjects'
import { CompletedProjects } from './collections/CompletedProjects'
import { CandidateProfiles } from './collections/CandidateProfiles'
import { Jobs } from './collections/Jobs'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Pages, Posts, Projects, Media, Categories, Users, ContactInfo, Locations, Clients, Stats, Highlights, Leadership, GroupCompanies, Faqs, Inquiries, YTlinks, MediaSection, ClientsServed, SuccessfulProjects, PrestigiousAwards, YearsOfExperience, ClientMarquee, Services, OngoingProjects, UpcomingProjects, CompletedProjects, CandidateProfiles, Jobs],
  cors: [getServerSideURL(), 'http://localhost:3000', 'http://localhost:3001'].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || 'b63c7e4871d5423bb0d97bf97e0fa821',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
