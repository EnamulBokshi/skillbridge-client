
import { getStudentProfile } from '@/services/student.service';
import Link from 'next/link';

export default async function StudentDetails({studentId}:{studentId: string}) {
  console.log("Fetching details for student ID: ", studentId);
  const { data: studentProfile, error: studentProfileError } =
    await getStudentProfile(studentId);

  if (studentProfileError || !studentProfile) {
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Unable to fetch student details.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border bg-background shadow-sm">
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={
                studentProfile.profilePicture ||
                studentProfile.user?.image ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                // studentProfile.user?.image ||
                // '/default-profile.png'
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
          </div>

          {/* Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {studentProfile.firstName || 'N/A'}{' '}
                {studentProfile.lastName || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">
                {studentProfile.user?.email || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {studentProfile.phone || 'N/A'}
              </p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">ZIP Code</p>
              <p className="font-medium">
                {studentProfile.zip || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">
                {studentProfile.address || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed Sessions
              </p>
              <p className="font-medium">
                {studentProfile.completedSessions || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="font-medium">
                {studentProfile.sid || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium capitalize">
                {studentProfile.user?.role || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  studentProfile.user?.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {studentProfile.user?.status || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t p-4 flex justify-end">
          <Link
            href={`/dashboard/admin/users/${studentProfile.user.id}/student/${studentProfile.id}?firstName=${studentProfile.firstName}&lastName=${studentProfile.lastName}&email=${studentProfile.user.email}&phone=${studentProfile.phone}&zip=${studentProfile.zip}&address=${studentProfile.address}&status=${studentProfile.status}&profilePicture=${studentProfile.profilePicture}`}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
