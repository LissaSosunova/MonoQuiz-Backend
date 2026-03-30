import { Schema, model, Document, ObjectId } from 'mongoose';
import { AnswerSchema } from './Answer.schema';
import { TestProgressStatus } from './enums/userTestProgressSchema';

export interface IUserTestProgress extends Document {
    userId: ObjectId,
    testId: ObjectId,

    status: TestProgressStatus,

    currentQuestionIndex: number,

    answers: {
        questionId: string,
        answer: any
    }[],

    startedAt: Date,
    completedAt: Date | null
}


const userTestProgressSchema = new Schema<IUserTestProgress>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },

    status: {
        type: String,
        enum: Object.values(TestProgressStatus),
        default: TestProgressStatus.NOT_STARTED
    },

    currentQuestionIndex: { type: Number, default: 0 },

    answers: { type: [AnswerSchema], default: [] },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});
userTestProgressSchema.index({ userId: 1, testId: 1 }, { unique: true });

export default model<IUserTestProgress>('UserTestProgress', userTestProgressSchema);
