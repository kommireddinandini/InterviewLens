# InterviewLens

InterviewLens is an AI-powered interview practice application designed to help students practice interviews and receive structured feedback on their answers, communication, and interview performance.

## Features

- Technical, HR, and Managerial interview modes
- Programming language selection for technical interviews
- Supported languages:
  - Python
  - Java
  - C
  - C++
  - JavaScript
  - TypeScript
  - C#
  - Go
  - Rust
  - Kotlin
  - Swift
  - PHP
  - Ruby
  - Dart
  - R
  - SQL
- Beginner, Intermediate, and Advanced difficulty levels
- Target role selection
- Custom question count
- Browser-based camera and microphone access
- Real-time interview recording using MediaRecorder
- Downloadable recorded interview answers
- Browser speech-to-text transcription
- Answer evaluation
- Good / Partially Correct / Incorrect result states
- Correct or improved answer suggestions
- Retry option for interview questions
- Final interview performance report
- Communication and interview practice feedback

## How It Works

1. Select the interview type.
2. Choose the technical language if required.
3. Select the difficulty level.
4. Enter the target job role.
5. Choose the number of questions.
6. Start the interview.
7. The application records the candidate's camera and microphone.
8. The candidate answers the interview question.
9. Speech-to-text generates a transcript when supported by the browser.
10. The answer is evaluated and feedback is displayed.
11. The candidate can retry the question if required.
12. A final performance report is generated at the end of the interview.

## Recording

InterviewLens uses the browser's `MediaRecorder` API to record camera and microphone input.

Recorded answers are converted into video blobs and can be played back or downloaded by the candidate.

The original recording is preserved as the source of truth because browser speech-to-text may occasionally produce transcription errors.

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser MediaRecorder API
- Browser Speech Recognition API
- Camera and microphone APIs

## Running Locally

Install the project dependencies:

```bash
npm install
