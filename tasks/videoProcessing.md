Your task is to implement the video processing in:
frontend/plugins/animation/Layouts/VideoProcessingLayout.tsx

Follow the coding guidelines in ./code-style.md
Tasks, that are already implemented, are marked with [x].

[x] Clicking on 'Process Video' the video is processed resulting in the analysis being saved in:
./server/data/video-analysis/

[x] When selecting a video from the dropdown,
the frontend should communicate with the backend to get the analysis if it already exists.

[x] It then displays all numerical values in a separate component directly under the video player.
The values are displayed in a plot.

[x] The json file with the analysis is loaded when the component is mounted. It makes a request to the backend
vie the get-directory endpoint.
 
[x] The frontend then makes a request via get-json to get the json file with the analysis.
it then stores the data in a state variable in the context.
The VideoAnalysisPlot component then displays the data.   