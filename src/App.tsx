import { useEffect, useState } from "react"

const CANDLE_COUNT = 4
const PARTICLE_COLORS = ["#dc2d86", "#9c2465", "#f4a535", "#76245e"]
const CONFETTI_COLORS = ["#ff3f9a", "#ffd24d", "#ff7eb6", "#a868e8", "#f26b5b"]

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21S3 15.8 3 8.8C3 5.7 5.2 4 7.7 4c1.8 0 3.4 1 4.3 2.3C12.9 5 14.5 4 16.3 4 18.8 4 21 5.7 21 8.8 21 15.8 12 21 12 21Z" />
    </svg>
  )
}

function BackgroundParticles() {
  return (
    <div className="background-particles" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          className={`particle particle-${index % 3}`}
          key={index}
          style={
            {
              "--particle-x": `${(index * 37 + 7) % 98}%`,
              "--particle-y": `${(index * 53 + 9) % 96}%`,
              "--particle-delay": `${(index % 9) * -0.7}s`,
              "--particle-duration": `${4 + (index % 6)}s`,
              backgroundColor: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

function Celebration({ run }: { run: number }) {
  if (!run) return null

  return (
    <div key={run} className="celebration" aria-hidden="true">
      {Array.from({ length: 52 }).map((_, index) => (
        <span
          className={`confetti confetti-${index % 3}`}
          key={index}
          style={
            {
              "--confetti-x": `${(index * 43 + 5) % 100}%`,
              "--confetti-drift": `${((index * 31) % 200) - 100}px`,
              "--confetti-delay": `${(index % 13) * 0.05}s`,
              "--confetti-spin": `${360 + (index % 5) * 160}deg`,
              backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

function Candle({
  index,
  isOut,
  onBlowOut,
}: {
  index: number
  isOut: boolean
  onBlowOut: () => void
}) {
  return (
    <button
      className={`candle ${isOut ? "is-out" : ""}`}
      type="button"
      onClick={onBlowOut}
      disabled={isOut}
      aria-label={
        isOut ? `Candle ${index + 1} is out` : `Blow out candle ${index + 1}`
      }
    >
      <span className="candle-wick" />
      <span className="candle-flame">
        <span className="flame-core" />
      </span>
      <span className="smoke smoke-one" />
      <span className="smoke smoke-two" />
      <span className="candle-body" />
    </button>
  )
}

function Cake({
  candles,
  onCandleClick,
}: {
  candles: boolean[]
  onCandleClick: (index: number) => void
}) {
  return (
    <div className="cake-wrap">
      <div className="candle-row">
        {candles.map((isOut, index) => (
          <Candle
            key={index}
            index={index}
            isOut={isOut}
            onBlowOut={() => onCandleClick(index)}
          />
        ))}
      </div>

      <div className="cake cake-top-tier">
        <div className="frosting frosting-small" />
        <span className="cake-highlight" />
      </div>
      <div className="cake cake-bottom-tier">
        <div className="frosting frosting-large" />
        <span className="cake-highlight" />
      </div>
      <div className="cake-plate">
        <span />
      </div>
    </div>
  )
}

function LetterCard({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <div
      className="letter-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
    >
      <button
        className="letter-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close letter"
      />

      <article className={`letter-card ${isOpen ? "is-open" : ""}`}>
        {!isOpen ? (
          <div className="letter-cover">
            <div className="letter-seal" aria-hidden="true">
              <HeartIcon />
            </div>
            <p>A birthday letter for</p>
            <h2>Yasi</h2>
            <span>Jasmine Tamagos</span>
            <button
              type="button"
              className="open-letter-button"
              onClick={onOpen}
            >
              Open your letter
            </button>
          </div>
        ) : (
          <div className="letter-paper">
            <button
              type="button"
              className="close-letter-button"
              onClick={onClose}
              aria-label="Close birthday letter"
            >
              <span />
              <span />
            </button>

            <p className="letter-date">On your special day</p>
            <h2 id="letter-title">Dear Yasi,</h2>

            <div className="letter-body">
              <p>
                Happy birthday, Jasmine—my Yasi. I hope today reminds you of how
                special, kind, and deeply loved you are. You deserve a day
                filled with peace, genuine smiles, and all the little things
                that make your heart happy.
              </p>
              <p>
                I am also sorry that I am giving this to you so late. I know this message should have reached 
                you much sooner, but even though it is late, every word in this letter is honest and comes 
                from my heart.
              </p>
              <p>
                I have wanted to tell you this for a long time. During the time
                when things became difficult between us, I was constantly busy
                and overwhelmed with schoolwork. Our instructors gave us more
                than twenty major projects—websites, software, website defenses,
                and research. I was exhausted and stressed, but I know that does
                not excuse the way I acted or the pain I caused you.
              </p>
              <p>
                You were affected by my foolish actions and bad decisions even
                though none of it was your fault. You did not deserve that. I am
                truly sorry for every time I made you feel hurt, confused, or
                unimportant. I take responsibility for what I did, and I wish I
                had handled everything with more honesty, patience, and care.
              </p>
              <p>
                I was afraid to tell you this before because I had already
                fallen in love with you. I kept it to myself for so long because
                I did not know how to face those feelings or how to tell you the
                truth. Now, I am learning to let those feelings rest because you
                have already found someone. I respect that, and I sincerely hope
                he takes good care of you, values you, and never gives you a
                reason to feel hurt or alone.
              </p>
              <p>
                Please remember that I will always be here to support you—not to
                interfere with your happiness, but simply as someone who will
                always wish the best for you. Thank you for the memories,
                laughter, and happiness you brought into my life. My birthday
                wish for you is a peaceful heart, a beautiful future, and all
                the love and care you truly deserve.
              </p>
              <p>
                I am deeply sorry for everything, Yasi. I cannot change the
                past, but I hope this letter shows how sincerely sorry and
                grateful I am. Happy birthday. Please keep smiling and keep
                choosing the life that makes you happiest.
              </p>
            </div>

            <div className="letter-signature">
              <span>From,</span>
              <strong>LJAY / Lawrence</strong>
              <HeartIcon />
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export default function App() {
  const [candles, setCandles] = useState<boolean[]>(
    Array(CANDLE_COUNT).fill(false),
  )
  const [celebration, setCelebration] = useState(0)
  const [ready, setReady] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)

  const allOut = candles.every(Boolean)
  const remaining = candles.filter((isOut) => !isOut).length

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 100)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!allOut) return

    const timer = window.setTimeout(() => setShowLetter(true), 900)
    return () => window.clearTimeout(timer)
  }, [allOut])

  const blowOutCandle = (index: number) => {
    if (candles[index]) return

    const nextCandles = candles.map((isOut, candleIndex) =>
      candleIndex === index ? true : isOut,
    )
    setCandles(nextCandles)

    if (nextCandles.every(Boolean)) {
      setCelebration((value) => value + 1)
    }
  }

  const relightCandles = () => {
    setCandles(Array(CANDLE_COUNT).fill(false))
    setShowLetter(false)
    setLetterOpen(false)
  }

  return (
    <main className={`birthday-scene ${ready ? "is-ready" : ""}`}>
      <BackgroundParticles />
      <Celebration run={celebration} />
      <div className="light-pool" aria-hidden="true" />

      <section className="birthday-content" aria-labelledby="birthday-title">
        <div className="heading-group">
          <div className="mini-stars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1 id="birthday-title">Happy Birthday, Yasi!</h1>
          <p className="instruction">
            {allOut
              ? "Your wish has been made."
              : "Click on the candles to blow them out!"}
          </p>
        </div>

        <div className={`cake-stage ${allOut ? "wish-complete" : ""}`}>
          <div className="heart-row" aria-hidden="true">
            <HeartIcon />
            <HeartIcon />
            <HeartIcon />
            <HeartIcon />
          </div>
          <Cake candles={candles} onCandleClick={blowOutCandle} />
          {allOut && (
            <div className="wish-glow" aria-hidden="true">
              <HeartIcon />
            </div>
          )}
        </div>

        <div className="wish-copy" aria-live="polite">
          <p>
            {allOut
              ? "May every wish you make today come true."
              : `${remaining} ${remaining === 1 ? "candle" : "candles"
              } left — tap each one to make a wish`}
          </p>
          {allOut && (
            <button
              type="button"
              className="relight-button"
              onClick={relightCandles}
            >
              Relight candles
            </button>
          )}
        </div>
      </section>

      {showLetter && (
        <LetterCard
          isOpen={letterOpen}
          onOpen={() => setLetterOpen(true)}
          onClose={() => setShowLetter(false)}
        />
      )}
    </main>
  )
}
