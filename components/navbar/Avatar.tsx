import LogoutButton from "@/components/LogoutButton";

export default function Avatar({ letter }: { letter: string }) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span className="text-3xl">{letter}</span>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
