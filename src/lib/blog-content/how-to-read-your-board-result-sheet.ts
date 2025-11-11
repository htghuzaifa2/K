
export default `
      <h2>How to Read Your Board Result Sheet Like a Pro</h2>
      <p>(Without calling "Bhai" after every line)</p>
      <p><em>"Numbers don’t lie, but they do need a translator."</em></p>
      
      <h3>1. What Each Column Actually Says</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Column Header</th>
              <th class="border border-border p-2 text-left">What it Means (Plain Urdu)</th>
              <th class="border border-border p-2 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">Roll No</td>
              <td class="border border-border p-2">Your 6-digit "identity" for life</td>
              <td class="border border-border p-2">123456</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Name / Father’s Name</td>
              <td class="border border-border p-2">Double-check spelling; once printed, boards charge Rs 500-1,500 for name-correction.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Subject Name</td>
              <td class="border border-border p-2">"Compulsory" = everyone sits; "Elective" = your chosen stream.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Theory Marks</td>
              <td class="border border-border p-2">Written paper out of 75 (or 60 for optional subjects).</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Practical / IA Marks</td>
              <td class="border border-border p-2">Lab / internal assessment (usually 25, but 30 for triple-science).</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Total in Figures</td>
              <td class="border border-border p-2">Theory + Practical. This is the number universities will ask for.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Grade</td>
              <td class="border border-border p-2">A+, A, B… (see table below). Calculated only on percentage, not raw marks.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Position / Merit</td>
              <td class="border border-border p-2">Only shown if you landed in top 20 of the entire board.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Result</td>
              <td class="border border-border p-2">PASS or FAIL; if "COMPARTMENT", you have one more chance.</td>
              <td class="border border-border p-2">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mt-4">2. Percentage vs Grade vs GPA — The Holy Trinity</h3>
      <p>Pakistani boards still print marks, but they also slap a grade for quick scanning. Conversion is universal across BISE & FBISE:</p>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Percentage</th>
              <th class="border border-border p-2 text-left">Grade</th>
              <th class="border border-border p-2 text-left">Grade-Point (4-scale)</th>
              <th class="border border-border p-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">90-100 %</td>
              <td class="border border-border p-2">A+</td>
              <td class="border border-border p-2">4.0</td>
              <td class="border border-border p-2">Outstanding</td>
            </tr>
            <tr>
              <td class="border border-border p-2">80-89 %</td>
              <td class="border border-border p-2">A</td>
              <td class="border border-border p-2">3.7</td>
              <td class="border border-border p-2">Excellent</td>
            </tr>
            <tr>
              <td class="border border-border p-2">70-79 %</td>
              <td class="border border-border p-2">B</td>
              <td class="border border-border p-2">3.3</td>
              <td class="border border-border p-2">Very Good</td>
            </tr>
            <tr>
              <td class="border border-border p-2">60-69 %</td>
              <td class="border border-border p-2">C</td>
              <td class="border border-border p-2">3.0</td>
              <td class="border border-border p-2">Good</td>
            </tr>
            <tr>
              <td class="border border-border p-2">50-59 %</td>
              <td class="border border-border p-2">D</td>
              <td class="border border-border p-2">2.0</td>
              <td class="border border-border p-2">Satisfactory</td>
            </tr>
            <tr>
              <td class="border border-border p-2">40-49 %</td>
              <td class="border border-border p-2">E</td>
              <td class="border border-border p-2">1.0</td>
              <td class="border border-border p-2">Pass</td>
            </tr>
            <tr>
              <td class="border border-border p-2">&lt;40 %</td>
              <td class="border border-border p-2">F</td>
              <td class="border border-border p-2">0.0</td>
              <td class="border border-border p-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-2">Formula on your sheet:<br>
      Percentage = (Total Obtained ÷ 1100) × 100<br>
      (For Matric; divide by 550 if only Part-I)</p>

      <h3 class="mt-4">3. Where Do Practical Marks Hide?</h3>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li>Science group: Physics, Chemistry, Biology/Comp — each carries 30 practical included in the "Total" column.</li>
        <li>ICS: Computer practical = 30.</li>
        <li>I.Com & Arts: No lab; internally assessed 25 added directly.</li>
      </ul>
      <p>If you see "25/25", smile. If you spot "17/25", that’s still a pass (minimum 33 %).</p>

      <h3 class="mt-4">4. Position Holders — "Board ka topi sir pe"</h3>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li>Divisional positions (1st, 2nd, 3rd) = highest aggregate in that board’s division.</li>
        <li>Overall board position = top 3 across all divisions; names announced before normal result.</li>
        <li>Institutional position = your college may paste your photo on the wall even if board rank is 47th — still an achievement, still "Masha’Allah" worthy.</li>
      </ul>

      <h3 class="mt-4">5. Compartment / Supplementary — Second Chance</h3>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li>One subject fail = "COMPARTMENT"; you keep the pass certificate but must clear that paper within 1 year or the whole result converts to FAIL.</li>
        <li>Two or more subjects fail = "FAIL"; re-appear as "ex-student" next session.</li>
      </ul>

      <h3 class="mt-4">6. What to Do the Minute You See the Sheet</h3>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li><strong>Screenshot & PDF</strong> – Download from board site; servers crash after 2 hours.</li>
        <li><strong>Double-check addition</strong> – Boards rarely err, but if theory + practical ≠ total, file "Re-totalling" within 15 days (fee Rs 1,000-1,500 per subject).</li>
        <li><strong>Name / father spell fix</strong> – Online form + Rs 500 stamp; universities reject differing names later.</li>
        <li><strong>Attestation race</strong> – Get 2 colour photocopies attested by BPS-17 officer for admissions; keep originals plastic-wrapped.</li>
        <li><strong>Prepare next documents</strong> – Provisional Certificate (board issues in August), Character Certificate (from school), Domicile (if you haven’t already).</li>
      </ul>

      <h3 class="mt-4">7. Next Milestones After Result</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Percentage Bracket</th>
              <th class="border border-border p-2 text-left">Likely Next Step</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">90 %+</td>
              <td class="border border-border p-2">Apply for top cadet colleges, medical/engineering universities, foreign scholarships (Turkey, China).</td>
            </tr>
            <tr>
              <td class="border border-border p-2">80-89 %</td>
              <td class="border border-border p-2">Flagship public universities (UET, PU, KU) + private-sector scholarships.</td>
            </tr>
            <tr>
              <td class="border border-border p-2">70-79 %</td>
              <td class="border border-border p-2">Good private universities; start ACCA/ICS if science feels heavy.</td>
            </tr>
            <tr>
              <td class="border border-border p-2">60-69 %</td>
              <td class="border border-border p-2">Associate degree programs, DAE, skill diplomas; improve via supplementary if aiming higher.</td>
            </tr>
            <tr>
              <td class="border border-border p-2">50-59 %</td>
              <td class="border border-border p-2">Vocational institutes, polytechnics, entrepreneurship routes; remember, many start-ups never asked for marks.</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Compartment</td>
              <td class="border border-border p-2">Book supply form today; academies run crash batches June-July.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mt-4">Quiet victory lap</h3>
      <p>Celebrate (or cry) silently—then plan. Whatever the digits, your effort deserves documentation. Type the next chapter on the feather-light OMOTON KB036 Bluetooth Keyboard; 10 m wireless freedom means the result sheet can stay on the wall while you draft your "What I Learnt From My 87 %" blog without a single click to disturb Ami’s tea.</p>
      <p><em>“May your percentage never define your worth, but may your next step define your world—congratulations or comeback, the board is just the beginning!”</em></p>
`;
