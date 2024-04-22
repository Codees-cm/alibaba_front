"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { languages } from '../../../i18n/settings'
import { Input } from "@/components/ui/input";
import { Trans } from 'react-i18next/TransWithoutContext'
import { useTranslation } from "@/app/i18n/client";

export default function Dashboard({locale}: string) {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href={`/${locale}/settings`} className="font-semibold text-primary">
              Profile
            </Link>
            <Link href={`/${locale}/settings/account`}>Account</Link>
            <Link href="#">Apperance</Link>
            <Link href="#">Notifications</Link>
            <Link href="#">Display</Link>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Update your account settings. Set your preferred language and
                  timezone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <label>Name</label>
                  <Input placeholder="Your name" />
                  <CardDescription className="text-sm">
                    This is the name that will be displayed on your profile and
                    in emails.
                  </CardDescription>
                  <br />
                  <label>Date of birth</label>
                  <Input type="date" placeholder="pick a date" />
                  <CardDescription>
                    Your date of birth is used to calculate your age.
                  </CardDescription>
                  <br />
                  <label>Language</label>
                  <select>
                    <option>English</option>
                    <option>French</option>
                  </select>
                  <CardDescription>
                    You can @mention other users and organizations to link to
                    them.
                    <Trans i18nKey="languageSwitcher" t={t}>
                      Switch from <strong>{ locale }</strong> to:{' '}
                    </Trans>
                    {languages.filter((l) => locale !== l).map((l, index) => {
                      return (
                        <span key={l}>
                          {index > 0 && ('-or-')}
                          {/* <Link href={`/${l}/`}>
                           
                          </Link> */}
                          <div onClick={(l) => router.push(`/${l}`) }>
                             {l}
                          </div>
                        </span>
                      )
                    })}
                  </CardDescription>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Update Account</Button>
              </CardFooter>
            </Card>
            <Card>

            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
