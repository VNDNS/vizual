# Video Analysis System

A system for analyzing videos using OpenAI's LLMs with customizable schemas.

## Prerequisites

- Node.js and npm installed
- OpenAI API key configured in `.env` file
- All dependencies will be installed via npm (including yt-dlp binary automatically)

## Directory Structure

```
video-analysis/
├── videos/         # Downloaded videos
├── snapshots/      # Extracted video snapshots
├── outputs/        # Analysis results (JSON files)
├── schemas/        # Custom analysis schemas
├── download.ts     # Video downloader
├── snapshot.ts     # Snapshot extractor
├── analyze.ts      # LLM analysis engine
├── index.ts        # Main entry point
└── example.ts      # Example usage
```

## How It Works

1. **Download**: Downloads a YouTube video in 720p resolution
2. **Extract**: Creates snapshots at regular intervals (default: 5 seconds)
3. **Analyze**: Sends each snapshot to OpenAI's LLM with:
   - Custom prompt describing what to analyze
   - Zod schema defining the expected output structure
   - Context from previous N snapshots
4. **Output**: Saves results to JSON file in `outputs/` directory
5. **Resume**: Can be interrupted and resumed from last processed snapshot

## Usage

### Basic Example

```typescript
import { runVideoAnalysis } from './index'
import { zeldaSchema, zeldaPrompt } from './schemas/zelda-schema'

await runVideoAnalysis({
  videoUrl: 'https://youtube.com/watch?v=...',
  prompt: zeldaPrompt,
  schema: zeldaSchema,
  contextWindow: 3,
  snapshotInterval: 5,
  model: 'gpt-4o-mini',
  schemaName: 'zelda'
})
```

### Creating Custom Schemas

Create a new schema file in `schemas/` directory:

```typescript
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export const YourSchema = z.object({
  field1: z.string().describe('Description'),
  field2: z.number().describe('Description'),
})

export const yourSchema = zodResponseFormat(YourSchema, 'schema_name')

export const yourPrompt = `Your analysis prompt here...`
```

## Running the Example

1. Edit `example.ts` and add your YouTube video URL
2. Run: `tsx server/video-analysis/example.ts`

## Configuration Options

- `videoUrl`: YouTube video URL to analyze
- `prompt`: Description of what to analyze in the video
- `schema`: Zod schema for structured output
- `contextWindow`: Number of previous snapshots to include as context (default: 3)
- `snapshotInterval`: Time in seconds between snapshots (default: 5)
- `model`: OpenAI model to use (default: 'gpt-4o-mini')
- `schemaName`: Name for the output file

## Resumability

The system saves progress after each snapshot. If interrupted, simply run the same command again and it will resume from the last processed snapshot.

## Notes

- Snapshots are reused if they already exist for a video
- Results include snapshot index and path for reference
- Context window helps maintain consistency across snapshots
- Adjust `snapshotInterval` based on video content (faster for action, slower for dialogue)

