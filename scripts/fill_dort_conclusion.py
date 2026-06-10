import json, shutil, time

path = r'C:/Users/Dustina/Websites/church-directory/public/hymnal-data/confessions.json'
shutil.copy(path, path + f'.bak-{int(time.time())}')

with open(path, encoding='utf-8') as f:
    data = json.load(f)

# Use proper apostrophes (replace mojibake \ufffd with right single quote)
intro = (
    "And so this is the clear, simple, and straightforward explanation of "
    "the orthodox teaching on the five articles in dispute in the Netherlands, "
    "as well as the rejection of the errors by which the Dutch churches have "
    "for some time been disturbed. This explanation and rejection the Synod "
    "declares to be derived from God\u2019s Word and in agreement with the "
    "confessions of the Reformed churches. Hence it clearly appears that "
    "those of whom one could hardly expect it have shown no truth, equity, "
    "and charity at all in wishing to make the public believe:"
)

accusation_1 = (
    "That the teaching of the Reformed churches on predestination and on "
    "the points associated with it by its very nature and tendency draws "
    "the minds of people away from all godliness and religion, is an "
    "opiate of the flesh and the devil, and is a stronghold of Satan where "
    "he lies in wait for all people, wounds most of them, and fatally "
    "pierces many of them with the arrows of both despair and self-assurance;"
)
accusation_2 = (
    "That this teaching makes God the author of sin, unjust, a tyrant, and "
    "a hypocrite; and is nothing but a refurbished Stoicism, Manicheism, "
    "Libertinism, and Mohammedanism;"
)
accusation_3 = (
    "That this teaching makes people carnally self-assured, since it "
    "persuades them that nothing endangers the salvation of the chosen, no "
    "matter how they live, so that they may commit the most outrageous "
    "crimes with self-assurance; and that on the other hand nothing is of "
    "use to the reprobate for salvation even if they have truly performed "
    "all the works of the saints;"
)
accusation_4 = (
    "That this teaching means that God predestined and created, by the "
    "bare and unqualified choice of his will, without the least regard or "
    "consideration of any sin, the greatest part of the world to eternal "
    "condemnation; that in the same manner in which election is the source "
    "and cause of faith and good works, reprobation is the cause of unbelief "
    "and ungodliness; that many infant children of believers are snatched in "
    "their innocence from their mothers\u2019 breasts and cruelly cast into "
    "hell so that neither the blood of Christ nor their baptism nor the "
    "prayers of the church at their baptism can be of any use to them;"
)
accusation_close = (
    "And very many other slanderous accusations of this kind, which the "
    "Reformed churches not only disavow but even denounce with their whole heart."
)

appeal = (
    "Therefore this Synod of Dort in the name of the Lord pleads with all "
    "who devoutly call on the name of our Savior Jesus Christ to form their "
    "judgment about the faith of the Reformed churches, not on the basis of "
    "false accusations gathered from here or there, or even on the basis of "
    "the personal statements of a number of ancient and modern "
    "authorities\u2014statements which are also often either quoted out of "
    "context or misquoted and twisted to convey a different meaning\u2014but "
    "on the basis of the churches\u2019 own official confessions and of the "
    "present explanation of the orthodox teaching which has been endorsed by "
    "the unanimous consent of the members of the whole Synod, one and all."
)

warning = (
    "Moreover, the Synod earnestly warns the false accusers themselves to "
    "consider how heavy a judgment of God awaits those who give false "
    "testimony against so many churches and their confessions, trouble the "
    "consciences of the weak, and seek to prejudice the minds of many "
    "against the fellowship of true believers."
)

charge = (
    "Finally, this Synod urges all fellow ministers in the gospel of Christ "
    "to deal with this teaching in a godly and reverent manner, in the "
    "academic institutions as well as in the churches; to do so, both in "
    "their speaking and writing, with a view to the glory of God\u2019s name, "
    "holiness of life, and the comfort of anxious souls; to think and also "
    "speak with Scripture according to the analogy of faith; and, finally, "
    "to refrain from all those ways of speaking which go beyond the bounds "
    "set for us by the genuine sense of the Holy Scriptures and which could "
    "give impertinent sophists a just occasion to scoff at the teaching of "
    "the Reformed churches or even to bring false accusations against it."
)

prayer = (
    "May God\u2019s Son Jesus Christ, who sits at the right hand of God and "
    "gives gifts to men, sanctify us in the truth, lead to the truth those "
    "who err, silence the mouths of those who lay false accusations against "
    "sound teaching, and equip faithful ministers of his Word with a spirit "
    "of wisdom and discretion, that all they say may be to the glory of God "
    "and the building up of their hearers. Amen."
)

entries = [
    {"id": "concl-introduction", "label": "Introduction",
     "question": "The Sum of the Synod\u2019s Declaration",
     "answer": intro, "proofs": []},
    {"id": "concl-accusation-1", "label": "First Accusation Refuted",
     "question": "Charge: Reformed Teaching Promotes Ungodliness",
     "answer": accusation_1, "proofs": []},
    {"id": "concl-accusation-2", "label": "Second Accusation Refuted",
     "question": "Charge: Reformed Teaching Makes God the Author of Sin",
     "answer": accusation_2, "proofs": []},
    {"id": "concl-accusation-3", "label": "Third Accusation Refuted",
     "question": "Charge: Reformed Teaching Breeds Carnal Self-Assurance",
     "answer": accusation_3, "proofs": []},
    {"id": "concl-accusation-4", "label": "Fourth Accusation Refuted",
     "question": "Charge: Reformed Teaching Damns Infants Without Cause",
     "answer": accusation_4, "proofs": []},
    {"id": "concl-disavowal", "label": "Disavowal",
     "question": "The Reformed Churches Denounce These Charges",
     "answer": accusation_close, "proofs": []},
    {"id": "concl-appeal", "label": "Appeal",
     "question": "Judge the Reformed Faith by Its Own Confessions",
     "answer": appeal, "proofs": []},
    {"id": "concl-warning", "label": "Warning",
     "question": "A Warning to False Accusers",
     "answer": warning, "proofs": []},
    {"id": "concl-charge", "label": "Charge to Ministers",
     "question": "How Ministers Must Teach This Doctrine",
     "answer": charge, "proofs": []},
    {"id": "concl-prayer", "label": "Closing Prayer",
     "question": "Final Prayer of the Synod",
     "answer": prayer, "proofs": []},
]

for d in data['documents']:
    if d['id'] == 'canons-of-dort':
        for g in d.get('groups', []):
            if (g.get('title') or '').strip().lower() == 'conclusion':
                g['entries'] = entries
                print('Filled Conclusion with', len(entries), 'entries.')
                break
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print('Wrote', path)
