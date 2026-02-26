import { getSubjectsAction } from '@/action/subject.action';
import { SubjectForm } from '@/components/modules/subject/CreateSubjectForm';
import { SubjectTableWrapper } from '@/components/modules/subject/SubjectTableWrapper';


export default async function SubjectsPageAdmin() {
  const { data, error } = await getSubjectsAction();
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">
            Manage your course subjects
          </p>
        </div>
      </div>

      <SubjectTableWrapper subjects={data || []} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create New Subject</h2>
        <SubjectForm />
      </div>
    </div>
  );
}
