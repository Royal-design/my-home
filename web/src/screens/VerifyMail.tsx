import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "@/services/authService";
import type { ApiResponse } from "@/utils/htttpRequest";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VerifyMail = () => {
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("id");
  const token = searchParam.get("token");
  const navigate = useNavigate();

  const hasRun = useRef(false);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      if (!userId || !token) {
        setStatus("error");
        setMessage("Invalid or corrupted verification link.");
        return;
      }

      try {
        const res = await verifyEmail({ id: userId, token });

        if (res.success || res.message === "User already verified.") {
          setStatus("success");
          setMessage(res.message || "Your email has been verified!");
          return;
        }

        setStatus("error");
        setMessage(res.message || "Verification failed.");
      } catch (error) {
        const err = error as ApiResponse;
        setStatus("error");
        setMessage(err?.message || "Verification failed.");
      }
    };

    verify();
  }, [userId, token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-950 text-white">
      <div className="max-w-md w-full text-center p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
            <h2 className="text-2xl font-semibold mb-2">
              Verifying your email...
            </h2>
            <p className="text-neutral-400">
              Please wait while we confirm your verification link.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-14 h-14 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold mb-2">Email Verified</h2>
            <p className="text-neutral-400 mb-6">{message}</p>

            <Button
              onClick={() => navigate("/signin")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-all"
            >
              Continue to Sign In
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-14 h-14 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-neutral-400 mb-6">{message}</p>

            <Button
              onClick={() => navigate("/signin")}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-all"
            >
              Back to Sign In
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
