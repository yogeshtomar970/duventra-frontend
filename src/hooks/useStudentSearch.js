import { useState } from "react";

/**
 * useStudentSearch
 * Har network section ke liye search input state.
 */
export default function useStudentSearch() {
  const [socMemberSearch, setSocMemberSearch] = useState("");
  const [socMemberSearchOpen, setSocMemberSearchOpen] = useState(false);

  const [stuMemberSearch, setStuMemberSearch] = useState("");
  const [stuMemberSearchOpen, setStuMemberSearchOpen] = useState(false);

  const [socFollowSearch, setSocFollowSearch] = useState("");
  const [socFollowSearchOpen, setSocFollowSearchOpen] = useState(false);

  const [stuFollowSearch, setStuFollowSearch] = useState("");
  const [stuFollowSearchOpen, setStuFollowSearchOpen] = useState(false);

  const [socSuggSearch, setSocSuggSearch] = useState("");
  const [socSuggSearchOpen, setSocSuggSearchOpen] = useState(false);

  const [stuSuggSearch, setStuSuggSearch] = useState("");
  const [stuSuggSearchOpen, setStuSuggSearchOpen] = useState(false);

  return {
    socMemberSearch, setSocMemberSearch,
    socMemberSearchOpen, setSocMemberSearchOpen,
    stuMemberSearch, setStuMemberSearch,
    stuMemberSearchOpen, setStuMemberSearchOpen,
    socFollowSearch, setSocFollowSearch,
    socFollowSearchOpen, setSocFollowSearchOpen,
    stuFollowSearch, setStuFollowSearch,
    stuFollowSearchOpen, setStuFollowSearchOpen,
    socSuggSearch, setSocSuggSearch,
    socSuggSearchOpen, setSocSuggSearchOpen,
    stuSuggSearch, setStuSuggSearch,
    stuSuggSearchOpen, setStuSuggSearchOpen,
  };
}
