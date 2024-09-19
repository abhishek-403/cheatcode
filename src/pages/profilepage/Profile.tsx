import { Avatar, Button, cn } from "@nextui-org/react";
import { HeatmapCalendar } from "../../components/profilepage/ProfileCards";
import { useGetUserByUserNameQuery } from "../../store/services/user";
import {
  ProblemDifficulty,
  ResponseStatusType,
} from "../../common/problem-types";
import { useEffect } from "react";
import { isUserAuthenticated } from "../../hooks/useAuthState";
import { useSignOutMutation } from "../../store/services/auth";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router";
import { ProfilePageSkeleton } from "../../utils/skeletons";

export default function Profile({
  match,
}: {
  match: { params: { userName: string } };
}) {
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserByUserNameQuery(match.params.userName);

  const auth = isUserAuthenticated();
  const history = useHistory();

  useEffect(() => {
    refetch();
  }, [auth, refetch]);

  const [signOut, { isLoading: logoutLoading }] = useSignOutMutation();
  const router = useIonRouter();
  async function handleSignOut() {
    try {
      if (logoutLoading) return;
      const { data, error } = await signOut();
      router.push("/");
      history.go(0);

      if (error) throw error;
    } catch (e) {}
  }

  if (isLoading || logoutLoading) {
    return (
      <div className="px-32 py-6">
        <ProfilePageSkeleton />
      </div>
    );
  }
  if (user.status === ResponseStatusType.Error) {
    return <div className="h-full center">{user.result}</div>;
  }

  return (
    <div className="px-32 py-6 flex flex-col gap-8 font-inter">
      <div className="flex  px-10 justify-between">
        <div className="flex gap-4 items-center   ">
          <div className=" flex flex-col px-14 py-10 bg-neutral-80 rounded-lg items-center  gap-1">
            <div className="flex items-end justify-center">
              <div className="text-6xl">
                {user.result.solvedTotals.reduce((total: any, solved: any) => {
                  return total + solved.total;
                }, 0)}
              </div>
              /
              <div className="">
                {user.result.totals.reduce((total: any, solved: any) => {
                  return total + solved.total;
                }, 0)}
              </div>
            </div>
            <div className="text-xs text-neutral-40">solved</div>
          </div>
          <div className="text-lg ">
            <div className="flex gap-2 flex-col">
              {user.result.solvedTotals.map((solved: any, i: number) => {
                const difficultyColor =
                  solved.difficulty === ProblemDifficulty.easy
                    ? "text-green-500"
                    : solved.difficulty === ProblemDifficulty.medium
                    ? "text-yellow-500"
                    : "text-red-500";
                return (
                  <div
                    key={i}
                    className={cn(
                      " cursor-pointer bg-neutral-80 rounded-lg px-6 py-3 text-center text-base flex items-center gap-2",
                      difficultyColor
                    )}
                  >
                    <div className="">{solved.difficulty} - </div>
                    <div className="font-bold">
                      {solved.total} / {user.result.totals[i].total}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start p-2 ">
          <div className="flex gap-2 items-center   ">
            <Avatar src={user.result.user.imageUrl} className="w-12 h-12" />
            <div className="flex flex-col">
              <div className="text-lg ">{user.result.user.name}</div>
              <div className="text-sm text-neutral-40">
                {user.result.user.userName}
              </div>
            </div>
          </div>
          {!!user.result.isMyProfile && (
            <div className="flex gap-2 mt-auto ml-auto w-fit">
              {/* <Button variant="solid" size="md">
                Edit
              </Button> */}
              <Button
                onClick={handleSignOut}
                variant="solid"
                className="bg-red-500 "
                size="md"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full py-2 flex items-center justify-center overflow-auto mt-10">
        <HeatmapCalendar submissionsMap={user.result.user.submissions} />
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  const options2: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options2);
  return formattedDate;
}
