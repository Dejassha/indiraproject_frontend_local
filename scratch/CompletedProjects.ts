import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const CompletedProjects: CollectionConfig = {
  slug: 'completed-projects',
  labels: {
    singular: 'Completed Project',
    plural: 'Completed Projects',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Project Title',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Image',
      required: true,
    },
    {
      name: 'overview',
      type: 'textarea',
      label: 'Overview',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Highlight',
          required: true,
        },
      ],
    },
    {
      name: 'amenities',
      type: 'array',
      label: 'Amenities',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Amenity',
          required: true,
        },
      ],
    },
    {
      name: 'layoutPlan',
      type: 'upload',
      relationTo: 'media',
      label: 'Layout Plan (Image)',
      required: true,
    },
  ],
}
