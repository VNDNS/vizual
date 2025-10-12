The purpose of this directory is to use llms from openAI to analyze videos.
Given a youtube video url a script will download the video in a suitable resolution.
Next, the a script will make snapshots of the video at regular intervals defined by a const.
All snapshots are stored in the directory video-analysis/snapshots.
The llm receives a prompt which describes, what the video is about.
It also receives a zod schema which describes the output of the llm.
The schema is defined in a separate file, depending on the content of the video.
The schema describes the current progress of the video.
For example, if the video is a Legend of Zelda game, the schema might be:
number of hearts, number of rupees, number of enemies killed, number of items collected, etc.
lastly the llm receives the outputs of the previous n snapshots giving it
context to better understand the current snapshot.
it outputs the object defined in the schema.
the output is appended to a json file in the directory video-analysis/outputs.
The logic is written such that it can be interrupted and resumed.

We communicate with openai using the following file: server/openai/openai.ts.

