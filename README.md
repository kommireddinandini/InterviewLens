# InterviewLens v3

Interview practice application with:
- Technical / HR / Managerial selection
- Technical language selection: Python, Java, C, C++, JavaScript, TypeScript, C#, Go, Rust, Kotlin, Swift, PHP, Ruby, Dart, R, SQL
- Beginner / Intermediate / Advanced
- Target role and question count
- Browser camera + microphone recording with real MediaRecorder chunks and downloadable answer videos
- Browser speech-to-text when supported (the original recording is always kept as the source of truth)
- Answer evaluation states: Good / Partially correct / Incorrect
- Correct/better answer shown after evaluation
- Retry the same question
- Final performance report

## Run
npm install
npm run dev

## Important
This v3 is intentionally a frontend-first working prototype. The evaluation logic currently uses transcript length plus deterministic answer references; it is NOT a real LLM evaluator yet.

For the production version, add a backend endpoint:
POST /api/evaluate
{question, candidateAnswer, interviewType, language, difficulty, role}
and return:
{status, score, strengths, mistakes, correctAnswer, explanation, followUpQuestion}

Camera gaze is still a lightweight prototype estimate in this frontend build; use a face-landmark/head-pose model for production-grade gaze analysis.
