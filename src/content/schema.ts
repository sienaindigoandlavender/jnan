import { z } from "zod";

export const letterSchema = z.object({
  id: z.string().min(1),
  glyph: z.string().min(1),
  latin: z.string().min(1),
  name: z.string().min(1),
  sound: z.string().min(1),
  story: z.string().min(1),
});

export const wordSchema = z.object({
  id: z.string().min(1),
  tifinagh: z.string().min(1),
  latin: z.string().min(1),
  meaning: z.string().min(1),
  lesson: z.string().min(1),
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  letters: z.array(z.string()).min(1),
});

export const scriptRoomSchema = z.object({
  $comment: z.string().optional(),
  id: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  guide: z.string().min(1),
  letters: z.array(letterSchema).min(1),
  words: z.array(wordSchema),
  lessons: z.array(lessonSchema).min(1),
});

export type Letter = z.infer<typeof letterSchema>;
export type Word = z.infer<typeof wordSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type ScriptRoom = z.infer<typeof scriptRoomSchema>;
