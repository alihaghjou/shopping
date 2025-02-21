import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function SearchDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            type="text"
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Link to="/search/$title" params={{
            title: searchQuery
          }} >
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
