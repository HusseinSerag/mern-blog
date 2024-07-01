import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface DashboardItemProps {
  headItems: string[];
  children: ReactNode;
  link: string;
  title: string;
}
export default function DashboardItem({
  headItems,
  children,
  title,
  link,
}: DashboardItemProps) {
  return (
    <div className="relative overflow-auto">
      <div className="flex w-full flex-col gap-2 rounded-md p-2 shadow-md md:w-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Recent {title}</span>
          <Link to={link}>
            <Button outline gradientDuoTone={"purpleToPink"}>
              See all
            </Button>
          </Link>
        </div>
        <Table className="relative" hoverable>
          <TableHead>
            {headItems.map((item) => (
              <TableHeadCell key={item}>{item}</TableHeadCell>
            ))}
          </TableHead>
          <TableBody className="divide-y">{children}</TableBody>
        </Table>
      </div>
    </div>
  );
}
