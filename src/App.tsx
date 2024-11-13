import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import { z } from "zod";

const syllabusItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  hours: z.number().positive("Hours must be a positive number").optional(),
});

const createClassSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  instructor: z.string().min(1, "Instructor is required"),
  syllabus: z
    .array(syllabusItemSchema)
    .min(1, "At least one syllabus item is required"),
});

export type CreateClassFormValues = z.infer<typeof createClassSchema>;

const CreateClassForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassFormValues>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      syllabus: [{ title: "", description: "", hours: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "syllabus",
  });

  const onSubmit: SubmitHandler<CreateClassFormValues> = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-md bg-white p-6 shadow-md"
    >
      <div>
        <label className="block font-semibold text-gray-700">Class Name</label>
        <input
          {...register("className")}
          type="text"
          className="mt-1 block w-full rounded-md border p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.className && (
          <p className="text-sm text-red-500">{errors.className.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Instructor</label>
        <input
          {...register("instructor")}
          type="text"
          className="mt-1 block w-full rounded-md border p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.instructor && (
          <p className="text-sm text-red-500">{errors.instructor.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Syllabus</h3>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-3 rounded-md border bg-gray-50 p-4"
          >
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                {...register(`syllabus.${index}.title`)}
                type="text"
                className="mt-1 block w-full rounded-md border p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.syllabus?.[index]?.title && (
                <p className="text-sm text-red-500">
                  {errors.syllabus[index].title?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                {...register(`syllabus.${index}.description`)}
                className="mt-1 block w-full rounded-md border p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.syllabus?.[index]?.description && (
                <p className="text-sm text-red-500">
                  {errors.syllabus[index].description?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Hours (optional)</label>
              <input
                {...register(`syllabus.${index}.hours`, {
                  valueAsNumber: true,
                })}
                type="number"
                className="mt-1 block w-full rounded-md border p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.syllabus?.[index]?.hours && (
                <p className="text-sm text-red-500">
                  {errors.syllabus[index].hours?.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-red-500"
            >
              Remove Syllabus Item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ title: "", description: "", hours: undefined })
          }
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Add Syllabus Item
        </button>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-white"
      >
        Create Class
      </button>
    </form>
  );
};

export default CreateClassForm;
