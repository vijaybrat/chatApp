import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { account } from "../config/appwriteConfig";
import { userStore } from "../state/userStore";
import { Models } from "appwrite";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LogoutModel() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = userStore((state) => state.userSession) as Models.Session;
  const [loading, setLoading] = useState(false);
  //delete session
  const logout = () => {
    setLoading(true);
    account
      .deleteSession(session.$id)
      .then(() => {
        setLoading(false)
        navigate("/login")
        toast.success("Logged out successfully!",{theme:"colored"})
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, { theme: "colored" });
      });
  };
  return (
    <>
      <Button color="danger" onPress={onOpen} variant="flat">
        Logout
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <h1>Are you Sure</h1>
                <p>
                  Once you logged out then you Can't access the private route
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={logout} disabled={loading}>
                  {loading?"Processing..":"Logout"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
